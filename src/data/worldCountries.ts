import countriesAtlas from 'world-atlas/countries-110m.json';
import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Polygon, MultiPolygon, MultiLineString } from 'geojson';
import * as FLAG_SVGS from 'country-flag-icons/string/3x2';

export interface WorldCountry {
  id: string;
  iso2: string;
  name: string;
  officialName: string;
  region: string;
  lat: number;
  lng: number;
  flagSvg: string;
  flagDataUri: string;
  polygons: number[][][][]; // array of polygon rings: [poly][ring][coord]
}

interface CountryMeta {
  iso2: string;
  officialName?: string;
  region: string;
  center?: [number, number]; // [lat, lng] visual mainland override where helpful
}

// Complete ISO 3166-1 numeric -> Alpha-2 + Region mapping for world-atlas/countries-110m.json
const ISO_NUMERIC_META: Record<string, CountryMeta> = {
  '004': { iso2: 'AF', officialName: 'Islamic Emirate of Afghanistan', region: 'Asia' },
  '008': { iso2: 'AL', officialName: 'Republic of Albania', region: 'Europe' },
  '010': { iso2: 'AQ', officialName: 'Antarctica', region: 'Antarctica', center: [-78.0, 15.0] },
  '012': { iso2: 'DZ', officialName: "People's Democratic Republic of Algeria", region: 'Africa' },
  '024': { iso2: 'AO', officialName: 'Republic of Angola', region: 'Africa' },
  '031': { iso2: 'AZ', officialName: 'Republic of Azerbaijan', region: 'Asia' },
  '032': { iso2: 'AR', officialName: 'Argentine Republic', region: 'South America' },
  '036': { iso2: 'AU', officialName: 'Commonwealth of Australia', region: 'Oceania', center: [-25.27, 133.77] },
  '040': { iso2: 'AT', officialName: 'Republic of Austria', region: 'Europe' },
  '044': { iso2: 'BS', officialName: 'Commonwealth of The Bahamas', region: 'North America' },
  '050': { iso2: 'BD', officialName: "People's Republic of Bangladesh", region: 'Asia' },
  '051': { iso2: 'AM', officialName: 'Republic of Armenia', region: 'Asia' },
  '056': { iso2: 'BE', officialName: 'Kingdom of Belgium', region: 'Europe' },
  '064': { iso2: 'BT', officialName: 'Kingdom of Bhutan', region: 'Asia' },
  '068': { iso2: 'BO', officialName: 'Plurinational State of Bolivia', region: 'South America' },
  '070': { iso2: 'BA', officialName: 'Bosnia and Herzegovina', region: 'Europe' },
  '072': { iso2: 'BW', officialName: 'Republic of Botswana', region: 'Africa' },
  '076': { iso2: 'BR', officialName: 'Federative Republic of Brazil', region: 'South America', center: [-14.23, -51.92] },
  '084': { iso2: 'BZ', officialName: 'Belize', region: 'North America' },
  '090': { iso2: 'SB', officialName: 'Solomon Islands', region: 'Oceania' },
  '096': { iso2: 'BN', officialName: 'Brunei Darussalam', region: 'Asia' },
  '100': { iso2: 'BG', officialName: 'Republic of Bulgaria', region: 'Europe' },
  '104': { iso2: 'MM', officialName: 'Republic of the Union of Myanmar', region: 'Asia' },
  '108': { iso2: 'BI', officialName: 'Republic of Burundi', region: 'Africa' },
  '112': { iso2: 'BY', officialName: 'Republic of Belarus', region: 'Europe' },
  '116': { iso2: 'KH', officialName: 'Kingdom of Cambodia', region: 'Asia' },
  '120': { iso2: 'CM', officialName: 'Republic of Cameroon', region: 'Africa' },
  '124': { iso2: 'CA', officialName: 'Canada', region: 'North America', center: [56.13, -106.34] },
  '140': { iso2: 'CF', officialName: 'Central African Republic', region: 'Africa' },
  '144': { iso2: 'LK', officialName: 'Democratic Socialist Republic of Sri Lanka', region: 'Asia' },
  '148': { iso2: 'TD', officialName: 'Republic of Chad', region: 'Africa' },
  '152': { iso2: 'CL', officialName: 'Republic of Chile', region: 'South America', center: [-33.45, -70.66] },
  '156': { iso2: 'CN', officialName: "People's Republic of China", region: 'Asia', center: [35.86, 104.19] },
  '158': { iso2: 'TW', officialName: 'Taiwan', region: 'Asia' },
  '170': { iso2: 'CO', officialName: 'Republic of Colombia', region: 'South America' },
  '178': { iso2: 'CG', officialName: 'Republic of the Congo', region: 'Africa' },
  '180': { iso2: 'CD', officialName: 'Democratic Republic of the Congo', region: 'Africa' },
  '188': { iso2: 'CR', officialName: 'Republic of Costa Rica', region: 'North America' },
  '191': { iso2: 'HR', officialName: 'Republic of Croatia', region: 'Europe' },
  '192': { iso2: 'CU', officialName: 'Republic of Cuba', region: 'North America' },
  '196': { iso2: 'CY', officialName: 'Republic of Cyprus', region: 'Europe' },
  '203': { iso2: 'CZ', officialName: 'Czech Republic', region: 'Europe' },
  '204': { iso2: 'BJ', officialName: 'Republic of Benin', region: 'Africa' },
  '208': { iso2: 'DK', officialName: 'Kingdom of Denmark', region: 'Europe', center: [56.26, 9.50] },
  '214': { iso2: 'DO', officialName: 'Dominican Republic', region: 'North America' },
  '218': { iso2: 'EC', officialName: 'Republic of Ecuador', region: 'South America' },
  '222': { iso2: 'SV', officialName: 'Republic of El Salvador', region: 'North America' },
  '226': { iso2: 'GQ', officialName: 'Republic of Equatorial Guinea', region: 'Africa' },
  '231': { iso2: 'ET', officialName: 'Federal Democratic Republic of Ethiopia', region: 'Africa' },
  '232': { iso2: 'ER', officialName: 'State of Eritrea', region: 'Africa' },
  '233': { iso2: 'EE', officialName: 'Republic of Estonia', region: 'Europe' },
  '238': { iso2: 'FK', officialName: 'Falkland Islands', region: 'South America' },
  '242': { iso2: 'FJ', officialName: 'Republic of Fiji', region: 'Oceania', center: [-17.71, 178.06] },
  '246': { iso2: 'FI', officialName: 'Republic of Finland', region: 'Europe' },
  '250': { iso2: 'FR', officialName: 'French Republic', region: 'Europe', center: [46.60, 2.21] },
  '260': { iso2: 'TF', officialName: 'French Southern Territories', region: 'Antarctica' },
  '262': { iso2: 'DJ', officialName: 'Republic of Djibouti', region: 'Africa' },
  '266': { iso2: 'GA', officialName: 'Gabonese Republic', region: 'Africa' },
  '268': { iso2: 'GE', officialName: 'Georgia', region: 'Asia' },
  '270': { iso2: 'GM', officialName: 'Republic of The Gambia', region: 'Africa' },
  '275': { iso2: 'PS', officialName: 'State of Palestine', region: 'Asia' },
  '276': { iso2: 'DE', officialName: 'Federal Republic of Germany', region: 'Europe' },
  '288': { iso2: 'GH', officialName: 'Republic of Ghana', region: 'Africa' },
  '300': { iso2: 'GR', officialName: 'Hellenic Republic', region: 'Europe' },
  '304': { iso2: 'GL', officialName: 'Greenland', region: 'North America', center: [71.70, -42.60] },
  '320': { iso2: 'GT', officialName: 'Republic of Guatemala', region: 'North America' },
  '324': { iso2: 'GN', officialName: 'Republic of Guinea', region: 'Africa' },
  '328': { iso2: 'GY', officialName: 'Co-operative Republic of Guyana', region: 'South America' },
  '332': { iso2: 'HT', officialName: 'Republic of Haiti', region: 'North America' },
  '340': { iso2: 'HN', officialName: 'Republic of Honduras', region: 'North America' },
  '348': { iso2: 'HU', officialName: 'Hungary', region: 'Europe' },
  '352': { iso2: 'IS', officialName: 'Iceland', region: 'Europe' },
  '356': { iso2: 'IN', officialName: 'Republic of India', region: 'Asia', center: [22.59, 78.96] },
  '360': { iso2: 'ID', officialName: 'Republic of Indonesia', region: 'Asia', center: [-2.50, 117.90] },
  '364': { iso2: 'IR', officialName: 'Islamic Republic of Iran', region: 'Asia' },
  '368': { iso2: 'IQ', officialName: 'Republic of Iraq', region: 'Asia' },
  '372': { iso2: 'IE', officialName: 'Ireland', region: 'Europe' },
  '376': { iso2: 'IL', officialName: 'State of Israel', region: 'Asia' },
  '380': { iso2: 'IT', officialName: 'Italian Republic', region: 'Europe' },
  '384': { iso2: 'CI', officialName: "Republic of Côte d'Ivoire", region: 'Africa' },
  '388': { iso2: 'JM', officialName: 'Jamaica', region: 'North America' },
  '392': { iso2: 'JP', officialName: 'Japan', region: 'Asia', center: [36.20, 138.25] },
  '398': { iso2: 'KZ', officialName: 'Republic of Kazakhstan', region: 'Asia' },
  '400': { iso2: 'JO', officialName: 'Hashemite Kingdom of Jordan', region: 'Asia' },
  '404': { iso2: 'KE', officialName: 'Republic of Kenya', region: 'Africa' },
  '408': { iso2: 'KP', officialName: "Democratic People's Republic of Korea", region: 'Asia' },
  '410': { iso2: 'KR', officialName: 'Republic of Korea', region: 'Asia' },
  '414': { iso2: 'KW', officialName: 'State of Kuwait', region: 'Asia' },
  '417': { iso2: 'KG', officialName: 'Kyrgyz Republic', region: 'Asia' },
  '418': { iso2: 'LA', officialName: "Lao People's Democratic Republic", region: 'Asia' },
  '422': { iso2: 'LB', officialName: 'Lebanese Republic', region: 'Asia' },
  '426': { iso2: 'LS', officialName: 'Kingdom of Lesotho', region: 'Africa' },
  '428': { iso2: 'LV', officialName: 'Republic of Latvia', region: 'Europe' },
  '430': { iso2: 'LR', officialName: 'Republic of Liberia', region: 'Africa' },
  '434': { iso2: 'LY', officialName: 'State of Libya', region: 'Africa' },
  '440': { iso2: 'LT', officialName: 'Republic of Lithuania', region: 'Europe' },
  '442': { iso2: 'LU', officialName: 'Grand Duchy of Luxembourg', region: 'Europe' },
  '450': { iso2: 'MG', officialName: 'Republic of Madagascar', region: 'Africa' },
  '454': { iso2: 'MW', officialName: 'Republic of Malawi', region: 'Africa' },
  '458': { iso2: 'MY', officialName: 'Malaysia', region: 'Asia', center: [3.80, 102.30] },
  '466': { iso2: 'ML', officialName: 'Republic of Mali', region: 'Africa' },
  '478': { iso2: 'MR', officialName: 'Islamic Republic of Mauritania', region: 'Africa' },
  '484': { iso2: 'MX', officialName: 'United Mexican States', region: 'North America' },
  '496': { iso2: 'MN', officialName: 'Mongolia', region: 'Asia' },
  '498': { iso2: 'MD', officialName: 'Republic of Moldova', region: 'Europe' },
  '499': { iso2: 'ME', officialName: 'Montenegro', region: 'Europe' },
  '504': { iso2: 'MA', officialName: 'Kingdom of Morocco', region: 'Africa' },
  '508': { iso2: 'MZ', officialName: 'Republic of Mozambique', region: 'Africa' },
  '512': { iso2: 'OM', officialName: 'Sultanate of Oman', region: 'Asia' },
  '516': { iso2: 'NA', officialName: 'Republic of Namibia', region: 'Africa' },
  '524': { iso2: 'NP', officialName: 'Federal Democratic Republic of Nepal', region: 'Asia' },
  '528': { iso2: 'NL', officialName: 'Kingdom of the Netherlands', region: 'Europe' },
  '540': { iso2: 'NC', officialName: 'New Caledonia', region: 'Oceania' },
  '548': { iso2: 'VU', officialName: 'Republic of Vanuatu', region: 'Oceania' },
  '554': { iso2: 'NZ', officialName: 'New Zealand', region: 'Oceania', center: [-41.28, 174.77] },
  '558': { iso2: 'NI', officialName: 'Republic of Nicaragua', region: 'North America' },
  '562': { iso2: 'NE', officialName: 'Republic of the Niger', region: 'Africa' },
  '566': { iso2: 'NG', officialName: 'Federal Republic of Nigeria', region: 'Africa' },
  '578': { iso2: 'NO', officialName: 'Kingdom of Norway', region: 'Europe', center: [61.50, 9.50] },
  '586': { iso2: 'PK', officialName: 'Islamic Republic of Pakistan', region: 'Asia' },
  '591': { iso2: 'PA', officialName: 'Republic of Panama', region: 'North America' },
  '598': { iso2: 'PG', officialName: 'Independent State of Papua New Guinea', region: 'Oceania' },
  '600': { iso2: 'PY', officialName: 'Republic of Paraguay', region: 'South America' },
  '604': { iso2: 'PE', officialName: 'Republic of Peru', region: 'South America' },
  '608': { iso2: 'PH', officialName: 'Republic of the Philippines', region: 'Asia' },
  '616': { iso2: 'PL', officialName: 'Republic of Poland', region: 'Europe' },
  '620': { iso2: 'PT', officialName: 'Portuguese Republic', region: 'Europe' },
  '624': { iso2: 'GW', officialName: 'Republic of Guinea-Bissau', region: 'Africa' },
  '626': { iso2: 'TL', officialName: 'Democratic Republic of Timor-Leste', region: 'Asia' },
  '630': { iso2: 'PR', officialName: 'Puerto Rico', region: 'North America' },
  '634': { iso2: 'QA', officialName: 'State of Qatar', region: 'Asia' },
  '642': { iso2: 'RO', officialName: 'Romania', region: 'Europe' },
  '643': { iso2: 'RU', officialName: 'Russian Federation', region: 'Europe / Asia', center: [61.52, 95.31] },
  '646': { iso2: 'RW', officialName: 'Republic of Rwanda', region: 'Africa' },
  '682': { iso2: 'SA', officialName: 'Kingdom of Saudi Arabia', region: 'Asia' },
  '686': { iso2: 'SN', officialName: 'Republic of Senegal', region: 'Africa' },
  '688': { iso2: 'RS', officialName: 'Republic of Serbia', region: 'Europe' },
  '694': { iso2: 'SL', officialName: 'Republic of Sierra Leone', region: 'Africa' },
  '703': { iso2: 'SK', officialName: 'Slovak Republic', region: 'Europe' },
  '704': { iso2: 'VN', officialName: 'Socialist Republic of Vietnam', region: 'Asia' },
  '705': { iso2: 'SI', officialName: 'Republic of Slovenia', region: 'Europe' },
  '706': { iso2: 'SO', officialName: 'Federal Republic of Somalia', region: 'Africa' },
  '710': { iso2: 'ZA', officialName: 'Republic of South Africa', region: 'Africa', center: [-29.00, 24.00] },
  '716': { iso2: 'ZW', officialName: 'Republic of Zimbabwe', region: 'Africa' },
  '724': { iso2: 'ES', officialName: 'Kingdom of Spain', region: 'Europe' },
  '728': { iso2: 'SS', officialName: 'Republic of South Sudan', region: 'Africa' },
  '729': { iso2: 'SD', officialName: 'Republic of the Sudan', region: 'Africa' },
  '732': { iso2: 'EH', officialName: 'Western Sahara', region: 'Africa' },
  '740': { iso2: 'SR', officialName: 'Republic of Suriname', region: 'South America' },
  '748': { iso2: 'SZ', officialName: 'Kingdom of Eswatini', region: 'Africa' },
  '752': { iso2: 'SE', officialName: 'Kingdom of Sweden', region: 'Europe' },
  '756': { iso2: 'CH', officialName: 'Swiss Confederation', region: 'Europe' },
  '760': { iso2: 'SY', officialName: 'Syrian Arab Republic', region: 'Asia' },
  '762': { iso2: 'TJ', officialName: 'Republic of Tajikistan', region: 'Asia' },
  '764': { iso2: 'TH', officialName: 'Kingdom of Thailand', region: 'Asia' },
  '768': { iso2: 'TG', officialName: 'Togolese Republic', region: 'Africa' },
  '780': { iso2: 'TT', officialName: 'Republic of Trinidad and Tobago', region: 'North America' },
  '784': { iso2: 'AE', officialName: 'United Arab Emirates', region: 'Asia' },
  '788': { iso2: 'TN', officialName: 'Republic of Tunisia', region: 'Africa' },
  '792': { iso2: 'TR', officialName: 'Republic of Türkiye', region: 'Asia / Europe' },
  '795': { iso2: 'TM', officialName: 'Turkmenistan', region: 'Asia' },
  '800': { iso2: 'UG', officialName: 'Republic of Uganda', region: 'Africa' },
  '804': { iso2: 'UA', officialName: 'Ukraine', region: 'Europe' },
  '807': { iso2: 'MK', officialName: 'Republic of North Macedonia', region: 'Europe' },
  '818': { iso2: 'EG', officialName: 'Arab Republic of Egypt', region: 'Africa' },
  '826': { iso2: 'GB', officialName: 'United Kingdom of Great Britain and Northern Ireland', region: 'Europe', center: [54.00, -2.50] },
  '834': { iso2: 'TZ', officialName: 'United Republic of Tanzania', region: 'Africa' },
  '840': { iso2: 'US', officialName: 'United States of America', region: 'North America', center: [39.83, -98.58] },
  '854': { iso2: 'BF', officialName: 'Burkina Faso', region: 'Africa' },
  '858': { iso2: 'UY', officialName: 'Oriental Republic of Uruguay', region: 'South America' },
  '860': { iso2: 'UZ', officialName: 'Republic of Uzbekistan', region: 'Asia' },
  '862': { iso2: 'VE', officialName: 'Bolivarian Republic of Venezuela', region: 'South America' },
  '887': { iso2: 'YE', officialName: 'Republic of Yemen', region: 'Asia' },
  '894': { iso2: 'ZM', officialName: 'Republic of Zambia', region: 'Africa' },
};

const NAME_FALLBACK_META: Record<string, CountryMeta> = {
  Kosovo: { iso2: 'XK', officialName: 'Republic of Kosovo', region: 'Europe', center: [42.60, 20.90] },
  'N. Cyprus': { iso2: 'CY', officialName: 'Northern Cyprus', region: 'Europe', center: [35.20, 33.40] },
  Somaliland: { iso2: 'SO', officialName: 'Somaliland', region: 'Africa', center: [9.56, 44.06] },
};

// Curated subset of geographically spaced countries whose national flags appear directly on the globe at default view
export const FEATURED_FLAG_ISO2 = new Set<string>([
  'US', 'CA', 'MX', 'BR', 'AR', 'CO', 'PE', 'CL',
  'GB', 'FR', 'DE', 'IT', 'ES', 'CH', 'SE', 'NO', 'PL', 'UA', 'RU', 'TR', 'GR',
  'EG', 'ZA', 'NG', 'KE', 'MA', 'ET', 'DZ', 'GH',
  'IN', 'CN', 'JP', 'KR', 'SA', 'AE', 'IL', 'PK', 'ID', 'TH', 'VN', 'KZ', 'IR',
  'AU', 'NZ',
]);

function ringArea(ring: number[][]): number {
  let area = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    area += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  }
  return Math.abs(area / 2);
}

function computePolygonVisualCenter(polygons: number[][][][]): [number, number] {
  let bestRing: number[][] = [];
  let maxArea = -1;
  for (const poly of polygons) {
    const outer = poly[0];
    if (!outer || outer.length === 0) continue;
    const area = ringArea(outer);
    if (area > maxArea) {
      maxArea = area;
      bestRing = outer;
    }
  }
  if (bestRing.length === 0) return [0, 0];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [lng, lat] of bestRing) {
    if (lng < minX) minX = lng;
    if (lng > maxX) maxX = lng;
    if (lat < minY) minY = lat;
    if (lat > maxY) maxY = lat;
  }

  // Handle antimeridian-crossing rings (like Fiji or Chukotka)
  let centerLng = (minX + maxX) / 2;
  if (maxX - minX > 180) {
    const shifted = bestRing.map(([lng]) => (lng < 0 ? lng + 360 : lng));
    const sMin = Math.min(...shifted);
    const sMax = Math.max(...shifted);
    centerLng = (sMin + sMax) / 2;
    if (centerLng > 180) centerLng -= 360;
  }
  const centerLat = (minY + maxY) / 2;
  return [centerLat, centerLng];
}

function pointInRing(lng: number, lat: number, ring: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];

    // Skip antimeridian wraparound edges
    if (Math.abs(xi - xj) > 180) continue;

    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInPolygon(lng: number, lat: number, poly: number[][][]): boolean {
  if (!poly.length || !pointInRing(lng, lat, poly[0])) return false;
  for (let i = 1; i < poly.length; i++) {
    if (pointInRing(lng, lat, poly[i])) return false;
  }
  return true;
}

export function svgToDataUri(svg: string): string {
  if (!svg) return '';
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Build parsed GeoJSON features and border mesh once at module load
const topology = countriesAtlas as unknown as Topology<{
  countries: GeometryCollection<{ name: string }>;
}>;

const geoFeatures = feature(topology, topology.objects.countries).features as Array<
  Feature<Polygon | MultiPolygon, { name: string }>
>;

export const WORLD_BORDERS: MultiLineString = mesh(
  topology,
  topology.objects.countries
);

const flagMap = FLAG_SVGS as unknown as Record<string, string>;

export const WORLD_COUNTRIES: WorldCountry[] = geoFeatures.map((feat, idx) => {
  const rawId = feat.id != null ? String(feat.id).padStart(3, '0') : '';
  const rawName = feat.properties?.name || `Region ${idx + 1}`;
  const meta =
    (rawId && ISO_NUMERIC_META[rawId]) ||
    NAME_FALLBACK_META[rawName] || {
      iso2: 'UN',
      officialName: rawName,
      region: 'International',
    };

  const polygons: number[][][][] =
    feat.geometry.type === 'Polygon'
      ? [feat.geometry.coordinates]
      : feat.geometry.coordinates;

  const [computedLat, computedLng] = meta.center || computePolygonVisualCenter(polygons);
  const flagSvg = flagMap[meta.iso2] || '';

  return {
    id: rawId || `custom-${rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    iso2: meta.iso2,
    name: rawName,
    officialName: meta.officialName || rawName,
    region: meta.region,
    lat: computedLat,
    lng: computedLng,
    flagSvg,
    flagDataUri: svgToDataUri(flagSvg),
    polygons,
  };
});

export function findCountryAtLatLng(lat: number, lng: number): WorldCountry | null {
  for (const country of WORLD_COUNTRIES) {
    for (const poly of country.polygons) {
      if (pointInPolygon(lng, lat, poly)) {
        return country;
      }
    }
  }
  return null;
}
