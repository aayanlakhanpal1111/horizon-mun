import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Globe,
  X,
  Compass,
  Play,
  Pause,
} from 'lucide-react';
import {
  WORLD_COUNTRIES,
  WORLD_BORDERS,
  FEATURED_FLAG_ISO2,
  WorldCountry,
  findCountryAtLatLng,
} from '../data/worldCountries';
import { useConference } from '../context/ConferenceContext';

const GLOBE_RADIUS = 2.15;

// Pre-allocated math helpers outside render loop
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _pinNormal = new THREE.Vector3();
const _targetDir = new THREE.Vector3();
const _currentDir = new THREE.Vector3();

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Biome-aware natural Earth coloring harmonized for realistic continent & ocean distinction
function getContinentFillColor(lat: number, lng: number): string {
  const absLat = Math.abs(lat);
  if (absLat > 68) return '#dbe6f0'; // Polar ice & tundra
  if (absLat > 55) return '#274d3b'; // Boreal forest
  // Sahara / Arabian / Thar / Australian arid belt
  const isSaharaArabia = lat >= 13 && lat <= 33 && lng >= -16 && lng <= 64;
  const isCentralAsiaArid = lat >= 35 && lat <= 46 && lng >= 52 && lng <= 98;
  const isAustraliaArid = lat >= -30 && lat <= -18 && lng >= 116 && lng <= 142;
  const isSWUsArid = lat >= 25 && lat <= 37 && lng >= -116 && lng <= -102;
  if (isSaharaArabia || isCentralAsiaArid || isAustraliaArid || isSWUsArid) {
    return '#8f7a52';
  }
  if (absLat < 14) return '#225937'; // Equatorial tropical forest
  if (absLat < 32) return '#2f6542'; // Subtropical lush green
  return '#356845'; // Temperate highlands & plains
}

interface EarthTextures {
  colorMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

function generateRealisticEarthTextures(isMobileOrSoftware: boolean): EarthTextures {
  const width = isMobileOrSoftware ? 2048 : 4096;
  const height = isMobileOrSoftware ? 1024 : 2048;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d')!;

  // 1. Deep ocean bathymetry gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0e294b');
  oceanGrad.addColorStop(0.15, '#0b2242');
  oceanGrad.addColorStop(0.5, '#0c2d57');
  oceanGrad.addColorStop(0.85, '#0b2242');
  oceanGrad.addColorStop(1, '#10294a');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Ocean roughness (darker = glossy water reflection)
  rCtx.fillStyle = '#383838';
  rCtx.fillRect(0, 0, width, height);

  // Subtle oceanic latitude/longitude grid lines
  ctx.strokeStyle = 'rgba(214, 184, 117, 0.08)';
  ctx.lineWidth = Math.max(1, width / 2048);
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  const toX = (lng: number) => ((lng + 180) / 360) * width;
  const toY = (lat: number) => ((90 - lat) / 180) * height;

  const traceRing = (c: CanvasRenderingContext2D, ring: number[][]) => {
    if (ring.length < 2) return;
    c.moveTo(toX(ring[0][0]), toY(ring[0][1]));
    for (let i = 1; i < ring.length; i++) {
      const prevLng = ring[i - 1][0];
      const currLng = ring[i][0];
      // Prevent horizontal streak across canvas when crossing antimeridian
      if (Math.abs(currLng - prevLng) > 180) {
        c.moveTo(toX(currLng), toY(ring[i][1]));
      } else {
        c.lineTo(toX(currLng), toY(ring[i][1]));
      }
    }
    c.closePath();
  };

  // 2. Continental Shelf Shallow Water Halo
  ctx.save();
  ctx.strokeStyle = 'rgba(32, 110, 155, 0.35)';
  ctx.lineWidth = width / 220;
  ctx.lineJoin = 'round';
  for (const country of WORLD_COUNTRIES) {
    for (const poly of country.polygons) {
      ctx.beginPath();
      traceRing(ctx, poly[0]);
      ctx.stroke();
    }
  }
  ctx.restore();

  // 3. Draw Accurate Continents & Country Fills
  for (const country of WORLD_COUNTRIES) {
    const fillColor = getContinentFillColor(country.lat, country.lng);
    ctx.fillStyle = fillColor;
    rCtx.fillStyle = '#dcdcdc'; // Matte terrain roughness

    for (const poly of country.polygons) {
      ctx.beginPath();
      rCtx.beginPath();
      for (const ring of poly) {
        traceRing(ctx, ring);
        traceRing(rCtx, ring);
      }
      ctx.fill('evenodd');
      rCtx.fill('evenodd');
    }
  }

  // 4. Subtle land terrain stipple texture over continents for natural texture
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  for (let i = 0; i < 4500; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const rad = (Math.random() * 2.5 + 0.5) * (width / 2048);
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)';
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 5. Crisp Country Border Strokes baked directly on Earth texture
  ctx.strokeStyle = 'rgba(245, 241, 232, 0.38)';
  ctx.lineWidth = Math.max(1, width / 2048);
  ctx.beginPath();
  for (const line of WORLD_BORDERS.coordinates) {
    if (line.length < 2) continue;
    ctx.moveTo(toX(line[0][0]), toY(line[0][1]));
    for (let i = 1; i < line.length; i++) {
      if (Math.abs(line[i][0] - line[i - 1][0]) > 180) {
        ctx.moveTo(toX(line[i][0]), toY(line[i][1]));
      } else {
        ctx.lineTo(toX(line[i][0]), toY(line[i][1]));
      }
    }
  }
  ctx.stroke();

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.needsUpdate = true;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.needsUpdate = true;

  return { colorMap, roughnessMap };
}

function buildBordersLineSegments(radius: number, colorHex: string): THREE.LineSegments {
  const positions: number[] = [];
  for (const line of WORLD_BORDERS.coordinates) {
    for (let i = 0; i < line.length - 1; i++) {
      const [lng1, lat1] = line[i];
      const [lng2, lat2] = line[i + 1];
      if (Math.abs(lng2 - lng1) > 180) continue;
      const p1 = latLngToVector3(lat1, lng1, radius);
      const p2 = latLngToVector3(lat2, lng2, radius);
      positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const mat = new THREE.LineBasicMaterial({
    color: new THREE.Color(colorHex),
    transparent: true,
    opacity: 0.48,
  });
  return new THREE.LineSegments(geo, mat);
}

function buildCountryHighlightGeometry(country: WorldCountry, radius: number): THREE.BufferGeometry {
  const positions: number[] = [];
  for (const poly of country.polygons) {
    for (const ring of poly) {
      for (let i = 0; i < ring.length - 1; i++) {
        const [lng1, lat1] = ring[i];
        const [lng2, lat2] = ring[i + 1];
        if (Math.abs(lng2 - lng1) > 180) continue;
        const p1 = latLngToVector3(lat1, lng1, radius);
        const p2 = latLngToVector3(lat2, lng2, radius);
        positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

function createFlagBadgeTexture(flagDataUri: string, isHighlighted: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 84;
  const ctx = canvas.getContext('2d')!;

  const drawFrame = (img?: HTMLImageElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer pill/rounded rect frame
    const pad = 6;
    const w = canvas.width - pad * 2;
    const h = canvas.height - pad * 2;
    const r = 10;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(pad, pad, w, h, r);
    ctx.clip();

    if (img) {
      ctx.drawImage(img, pad, pad, w, h);
    } else {
      ctx.fillStyle = '#101C35';
      ctx.fillRect(pad, pad, w, h);
    }
    ctx.restore();

    // Crisp champagne gold border
    ctx.strokeStyle = isHighlighted ? '#FFFFFF' : '#D6B875';
    ctx.lineWidth = isHighlighted ? 4.5 : 3;
    ctx.beginPath();
    ctx.roundRect(pad, pad, w, h, r);
    ctx.stroke();
  };

  drawFrame();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (flagDataUri) {
    const img = new Image();
    img.onload = () => {
      drawFrame(img);
      texture.needsUpdate = true;
    };
    img.src = flagDataUri;
  }

  return texture;
}

export default function HeroGlobe3D() {
  const { globeSettings, updateGlobeSettings } = useConference();
  const mountRef = useRef<HTMLDivElement>(null);

  const [selectedCountry, setSelectedCountry] = useState<WorldCountry | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<{
    country: WorldCountry;
    x: number;
    y: number;
  } | null>(null);

  const settingsRef = useRef(globeSettings);
  settingsRef.current = globeSettings;

  const selectedCountryRef = useRef<WorldCountry | null>(null);
  selectedCountryRef.current = selectedCountry;

  // Imperative refs for camera focus & zoom controls
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cameraTransitionRef = useRef<{
    active: boolean;
    targetDir: THREE.Vector3;
    targetDist: number;
  }>({
    active: false,
    targetDir: new THREE.Vector3(0, 0.2, 1).normalize(),
    targetDist: globeSettings.initialZoom,
  });

  // Scene dynamic refs for instant Admin updates without rebuilding WebGL context
  const bordersRef = useRef<THREE.LineSegments | null>(null);
  const flagsGroupRef = useRef<THREE.Group | null>(null);
  const atmosphereGroupRef = useRef<THREE.Group | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const highlightLinesRef = useRef<THREE.LineSegments | null>(null);
  const dynamicFlagSpriteRef = useRef<THREE.Sprite | null>(null);

  const focusCountry = useCallback((country: WorldCountry) => {
    setSelectedCountry(country);
    const focusVec = latLngToVector3(country.lat, country.lng, 1).normalize();
    cameraTransitionRef.current = {
      active: true,
      targetDir: focusVec,
      targetDist: settingsRef.current.focusZoom,
    };
  }, []);

  const returnToFullGlobe = useCallback(() => {
    setSelectedCountry(null);
    const cam = cameraRef.current;
    const currentNorm = cam
      ? cam.position.clone().normalize()
      : new THREE.Vector3(0, 0.2, 1).normalize();
    cameraTransitionRef.current = {
      active: true,
      targetDir: currentNorm,
      targetDist: settingsRef.current.initialZoom,
    };
  }, []);

  const handleZoomStep = useCallback((factor: number) => {
    const cam = cameraRef.current;
    const controls = controlsRef.current;
    if (!cam || !controls) return;
    cameraTransitionRef.current.active = false;
    const currentDist = cam.position.length();
    const nextDist = THREE.MathUtils.clamp(currentDist * factor, 2.9, 9.0);
    cam.position.normalize().multiplyScalar(nextDist);
    controls.update();
  }, []);

  // Sync live Admin settings into existing Three.js objects
  useEffect(() => {
    if (bordersRef.current) {
      bordersRef.current.visible = globeSettings.showCountryBorders;
      const mat = bordersRef.current.material as THREE.LineBasicMaterial;
      mat.color.set(globeSettings.highlightColor || '#D6B875');
    }
    if (flagsGroupRef.current) {
      flagsGroupRef.current.visible = globeSettings.showFlags;
    }
    if (atmosphereGroupRef.current) {
      atmosphereGroupRef.current.visible = globeSettings.showAtmosphere;
    }
    if (starsRef.current) {
      starsRef.current.visible = globeSettings.showStars;
    }
    if (controlsRef.current) {
      controlsRef.current.enableZoom = globeSettings.enableZoom;
      controlsRef.current.autoRotate = globeSettings.autoRotate && !selectedCountry;
      controlsRef.current.autoRotateSpeed = globeSettings.rotationSpeed * 2.4;
    }
    if (highlightLinesRef.current) {
      const mat = highlightLinesRef.current.material as THREE.LineBasicMaterial;
      mat.color.set(globeSettings.highlightColor || '#D6B875');
    }
  }, [globeSettings, selectedCountry]);

  // Update highlighted country border geometry & extra flag pin when selectedCountry changes
  useEffect(() => {
    const hl = highlightLinesRef.current;
    if (hl) {
      hl.geometry.dispose();
      if (selectedCountry) {
        hl.geometry = buildCountryHighlightGeometry(selectedCountry, GLOBE_RADIUS * 1.006);
        hl.visible = true;
      } else {
        hl.geometry = new THREE.BufferGeometry();
        hl.visible = false;
      }
    }

    const dynSprite = dynamicFlagSpriteRef.current;
    if (dynSprite) {
      const prevMat = dynSprite.material as THREE.SpriteMaterial;
      prevMat.map?.dispose();
      if (selectedCountry && !FEATURED_FLAG_ISO2.has(selectedCountry.iso2) && selectedCountry.flagDataUri) {
        const tex = createFlagBadgeTexture(selectedCountry.flagDataUri, true);
        prevMat.map = tex;
        prevMat.needsUpdate = true;
        dynSprite.position.copy(latLngToVector3(selectedCountry.lat, selectedCountry.lng, GLOBE_RADIUS * 1.06));
        dynSprite.visible = settingsRef.current.showFlags;
      } else {
        dynSprite.visible = false;
      }
    }
  }, [selectedCountry]);

  // Initialize Three.js WebGL scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();

    const initialW = container.clientWidth || 600;
    const initialH = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(42, initialW / initialH, 0.1, 100);
    // Start centered cleanly toward Eurasia / India & Africa
    const startPos = latLngToVector3(22, 48, settingsRef.current.initialZoom);
    camera.position.copy(startPos);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialW, initialH);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Studio PMREM reflection environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    // Realistic 3-point celestial lighting
    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.7);
    sunLight.position.set(7, 4, 6);
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0x6b93d6, 0x101c35, 1.35);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0xd6b875, 1.4);
    rimLight.position.set(-6, -3, -5);
    scene.add(rimLight);

    // OrbitControls for smooth mouse + touchscreen drag & pinch/wheel zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = settingsRef.current.enableZoom;
    controls.minDistance = 2.9;
    controls.maxDistance = 9.0;
    controls.rotateSpeed = 0.65;
    controls.zoomSpeed = 0.85;
    controls.autoRotate = settingsRef.current.autoRotate;
    controls.autoRotateSpeed = settingsRef.current.rotationSpeed * 2.4;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Cancel camera focus animation immediately when user grabs controls
    const onControlStart = () => {
      cameraTransitionRef.current.active = false;
    };
    controls.addEventListener('start', onControlStart);

    // Globe Assembly Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Primary Earth Sphere with Accurate Continents, Oceans, Borders & Roughness Map
    const { colorMap, roughnessMap } = generateRealisticEarthTextures(isMobile || isSoftwareGl);
    colorMap.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 72, 72);
    const earthMat = new THREE.MeshStandardMaterial({
      map: colorMap,
      roughnessMap,
      roughness: 0.9,
      metalness: 0.08,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Crisp Vector Country Borders Overlay
    const bordersMesh = buildBordersLineSegments(
      GLOBE_RADIUS * 1.002,
      settingsRef.current.highlightColor || '#D6B875'
    );
    bordersMesh.visible = settingsRef.current.showCountryBorders;
    bordersRef.current = bordersMesh;
    globeGroup.add(bordersMesh);

    // 3. Selected Country Highlight Border
    const highlightMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(settingsRef.current.highlightColor || '#D6B875'),
      transparent: true,
      opacity: 1,
    });
    const highlightLines = new THREE.LineSegments(new THREE.BufferGeometry(), highlightMat);
    highlightLines.visible = false;
    highlightLinesRef.current = highlightLines;
    globeGroup.add(highlightLines);

    // 4. Atmospheric Glow Shaders (Outer Halo + Inner Fresnel Rim)
    const atmosphereGroup = new THREE.Group();
    atmosphereGroup.visible = settingsRef.current.showAtmosphere;
    atmosphereGroupRef.current = atmosphereGroup;
    globeGroup.add(atmosphereGroup);

    const outerAtmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.11, 48, 48);
    const outerAtmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vec3 viewDir = normalize(vViewPos);
          float rim = pow(0.66 - dot(vNormal, viewDir), 3.2);
          vec3 atmosColor = mix(vec3(0.28, 0.56, 0.95), vec3(0.84, 0.72, 0.46), 0.25);
          gl_FragColor = vec4(atmosColor, clamp(rim, 0.0, 0.65));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    atmosphereGroup.add(new THREE.Mesh(outerAtmosGeo, outerAtmosMat));

    const innerRimGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.009, 48, 48);
    const innerRimMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vec3 viewDir = normalize(vViewPos);
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 3.6);
          vec3 rimCol = vec3(0.45, 0.74, 1.0);
          gl_FragColor = vec4(rimCol, fresnel * 0.42);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    atmosphereGroup.add(new THREE.Mesh(innerRimGeo, innerRimMat));

    // 5. Geographically Positioned National Flags
    const flagsGroup = new THREE.Group();
    flagsGroup.visible = settingsRef.current.showFlags;
    flagsGroupRef.current = flagsGroup;
    globeGroup.add(flagsGroup);

    const flagEntries: Array<{
      country: WorldCountry;
      sprite: THREE.Sprite;
      dot: THREE.Mesh;
      normal: THREE.Vector3;
    }> = [];
    const clickableSprites: THREE.Sprite[] = [];
    const dotGeo = new THREE.SphereGeometry(0.018, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xd6b875 });

    for (const country of WORLD_COUNTRIES) {
      if (!FEATURED_FLAG_ISO2.has(country.iso2) || !country.flagDataUri) continue;

      const surfacePos = latLngToVector3(country.lat, country.lng, GLOBE_RADIUS * 1.005);
      const spritePos = latLngToVector3(country.lat, country.lng, GLOBE_RADIUS * 1.055);
      const normal = surfacePos.clone().normalize();

      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(surfacePos);
      flagsGroup.add(dot);

      const tex = createFlagBadgeTexture(country.flagDataUri, false);
      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.copy(spritePos);
      sprite.scale.set(0.16, 0.112, 1);
      sprite.userData.country = country;
      flagsGroup.add(sprite);

      clickableSprites.push(sprite);
      flagEntries.push({ country, sprite, dot, normal });
    }

    // Extra dynamic flag sprite for clicked countries outside FEATURED_FLAG_ISO2
    const dynFlagMat = new THREE.SpriteMaterial({
      transparent: true,
      depthWrite: false,
    });
    const dynFlagSprite = new THREE.Sprite(dynFlagMat);
    dynFlagSprite.scale.set(0.19, 0.133, 1);
    dynFlagSprite.visible = false;
    dynamicFlagSpriteRef.current = dynFlagSprite;
    globeGroup.add(dynFlagSprite);

    // 6. Subtle Starfield
    const starCount = 480;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 14 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const tint = Math.random();
      starColors[i * 3] = tint > 0.65 ? 0.94 : 0.92;
      starColors[i * 3 + 1] = tint > 0.65 ? 0.85 : 0.95;
      starColors[i * 3 + 2] = tint > 0.65 ? 0.62 : 1.0;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
    });
    const stars = new THREE.Points(starGeo, starMat);
    stars.visible = settingsRef.current.showStars;
    starsRef.current = stars;
    scene.add(stars);

    // Raycaster for Flag & Country Click / Hover Detection
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };
    let lastHoverTime = 0;

    const updateNDC = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      return rect;
    };

    const pickCountryAtPointer = (clientX: number, clientY: number): WorldCountry | null => {
      updateNDC(clientX, clientY);
      raycaster.setFromCamera(pointerNDC, camera);

      // 1. Check visible front-facing flag sprites first
      if (settingsRef.current.showFlags) {
        const visibleFlags = clickableSprites.filter((s) => s.visible);
        const flagHits = raycaster.intersectObjects(visibleFlags, false);
        if (flagHits.length > 0 && flagHits[0].object.userData.country) {
          return flagHits[0].object.userData.country as WorldCountry;
        }
      }

      // 2. Check exact hit on Earth sphere UV -> (lat, lng) -> country polygon
      const earthHits = raycaster.intersectObject(earthMesh, false);
      if (earthHits.length > 0 && earthHits[0].uv) {
        const uv = earthHits[0].uv;
        const lng = uv.x * 360 - 180;
        const lat = uv.y * 180 - 90;
        return findCountryAtLatLng(lat, lng);
      }

      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) > 6) return; // Was a drag/pan, not a click/tap

      const picked = pickCountryAtPointer(e.clientX, e.clientY);
      if (picked) {
        focusCountry(picked);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const now = performance.now();
      if (now - lastHoverTime < 45) return;
      lastHoverTime = now;

      const rect = renderer.domElement.getBoundingClientRect();
      const picked = pickCountryAtPointer(e.clientX, e.clientY);
      if (picked) {
        renderer.domElement.style.cursor = 'pointer';
        setHoveredCountry({
          country: picked,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredCountry(null);
      }
    };

    const onPointerLeave = () => {
      setHoveredCountry(null);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerleave', onPointerLeave);

    // ResizeObserver for crisp responsive sizing inside the container
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let frameId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth spherical camera transition when focusing a country or returning to full globe
      const trans = cameraTransitionRef.current;
      if (trans.active) {
        const currentDist = camera.position.length();
        _currentDir.copy(camera.position).normalize();
        _targetDir.copy(trans.targetDir);

        // Smooth angular + radial damping
        const lerpAlpha = 1 - Math.exp(-5.2 * delta);
        _currentDir.lerp(_targetDir, lerpAlpha).normalize();
        const nextDist = THREE.MathUtils.damp(currentDist, trans.targetDist, 5.2, delta);

        camera.position.copy(_currentDir).multiplyScalar(nextDist);
        camera.lookAt(0, 0, 0);

        if (
          _currentDir.distanceTo(_targetDir) < 0.004 &&
          Math.abs(nextDist - trans.targetDist) < 0.01
        ) {
          camera.position.copy(_targetDir).multiplyScalar(trans.targetDist);
          trans.active = false;
        }
      }

      controls.update();

      // Scale and fade flags cleanly based on camera facing & zoom distance
      _camDir.copy(camera.position).normalize();
      const camDist = camera.position.length();
      const zoomScale = THREE.MathUtils.clamp(camDist / 5.8, 0.55, 1.15);

      for (const entry of flagEntries) {
        const dotCam = entry.normal.dot(_camDir);
        const isFront = dotCam > 0.14;
        entry.sprite.visible = isFront;
        entry.dot.visible = isFront;
        if (isFront) {
          const isSel = selectedCountryRef.current?.id === entry.country.id;
          const baseW = isSel ? 0.21 : 0.155;
          const baseH = isSel ? 0.147 : 0.108;
          entry.sprite.scale.set(baseW * zoomScale, baseH * zoomScale, 1);
          const mat = entry.sprite.material as THREE.SpriteMaterial;
          mat.opacity = THREE.MathUtils.clamp((dotCam - 0.14) * 3.5, 0.25, 1);
        }
      }

      if (dynFlagSprite.visible && selectedCountryRef.current) {
        _pinNormal
          .copy(dynFlagSprite.position)
          .normalize();
        const dotCam = _pinNormal.dot(_camDir);
        dynFlagSprite.visible = dotCam > 0.05 && settingsRef.current.showFlags;
        dynFlagSprite.scale.set(0.21 * zoomScale, 0.147 * zoomScale, 1);
      }

      // Subtle star drift
      stars.rotation.y += delta * 0.012;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('pointermove', onPointerMove);
      domEl.removeEventListener('pointerleave', onPointerLeave);
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }

      earthGeo.dispose();
      earthMat.dispose();
      colorMap.dispose();
      roughnessMap.dispose();
      bordersMesh.geometry.dispose();
      (bordersMesh.material as THREE.Material).dispose();
      highlightLines.geometry.dispose();
      highlightMat.dispose();
      outerAtmosGeo.dispose();
      outerAtmosMat.dispose();
      innerRimGeo.dispose();
      innerRimMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      for (const entry of flagEntries) {
        const mat = entry.sprite.material as THREE.SpriteMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
      dynFlagMat.map?.dispose();
      dynFlagMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      envTex.dispose();
      renderer.dispose();
    };
  }, [focusCountry]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-[#060913] border border-[#D6B875]/30 shadow-2xl select-none">
      {/* Dedicated WebGL Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top-left subtle interaction hint */}
      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101C35]/90 border border-[#D6B875]/35 text-[11px] font-medium text-[#F5F1E8]/90 shadow-lg">
          <Globe className="w-3.5 h-3.5 text-[#D6B875]" />
          <span>Drag to rotate · Pinch or scroll to zoom · Click any country</span>
        </div>
      </div>

      {/* Hover Country Tooltip (Desktop) */}
      {hoveredCountry && !selectedCountry && (
        <div
          style={{
            left: Math.min(Math.max(hoveredCountry.x + 12, 12), 260),
            top: Math.max(hoveredCountry.y - 44, 48),
          }}
          className="absolute z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#08090D]/95 border border-[#D6B875]/50 shadow-xl"
        >
          {hoveredCountry.country.flagDataUri && (
            <img
              src={hoveredCountry.country.flagDataUri}
              alt={hoveredCountry.country.name}
              className="w-5 h-3.5 object-cover rounded-[2px] border border-white/20"
            />
          )}
          <span className="text-xs font-semibold text-[#F5F1E8] whitespace-nowrap">
            {hoveredCountry.country.name}
          </span>
        </div>
      )}

      {/* Selected Country Information Panel */}
      {selectedCountry && (
        <div className="absolute top-14 left-3.5 right-3.5 sm:right-auto sm:w-80 z-20 p-4 rounded-2xl bg-[#101C35]/95 border border-[#D6B875]/55 shadow-2xl text-[#F5F1E8]">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              {selectedCountry.flagDataUri ? (
                <img
                  src={selectedCountry.flagDataUri}
                  alt={`${selectedCountry.officialName} Flag`}
                  className="w-12 h-8 object-cover rounded border border-[#D6B875]/50 shadow shrink-0"
                />
              ) : (
                <div className="w-12 h-8 rounded bg-[#08090D] border border-[#D6B875]/40 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-[#D6B875]" />
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B875] block">
                  {selectedCountry.region} · {selectedCountry.iso2}
                </span>
                <h4 className="text-base font-serif font-bold text-white leading-snug truncate">
                  {selectedCountry.name}
                </h4>
              </div>
            </div>

            <button
              onClick={returnToFullGlobe}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5F1E8]/80 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close country panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 text-xs border-t border-white/10 pt-3 mb-3">
            <div>
              <span className="text-[#F5F1E8]/55 block text-[10px] uppercase tracking-wider">
                Official Name
              </span>
              <span className="text-[#F5F1E8]/95 font-medium">
                {selectedCountry.officialName}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#F5F1E8]/75">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#D6B875]" />
                <span>Geographic Coordinates</span>
              </span>
              <span className="font-mono text-[#D6B875]">
                {selectedCountry.lat.toFixed(2)}°, {selectedCountry.lng.toFixed(2)}°
              </span>
            </div>
          </div>

          <button
            onClick={returnToFullGlobe}
            className="w-full py-2 px-3 rounded-lg bg-[#D6B875] hover:bg-[#F2DEAA] text-[#08090D] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Return to Full Globe</span>
          </button>
        </div>
      )}

      {/* Unified Bottom Control Dock */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#101C35]/95 border border-[#D6B875]/35 shadow-xl max-w-[94%]">
        <button
          onClick={returnToFullGlobe}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            !selectedCountry
              ? 'bg-[#D6B875] text-[#08090D]'
              : 'text-[#F5F1E8]/85 hover:text-white hover:bg-white/10'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Full Globe</span>
        </button>

        <div className="h-4 w-px bg-white/15" />

        <button
          onClick={() => updateGlobeSettings({ autoRotate: !globeSettings.autoRotate })}
          className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#D6B875] hover:text-[#F2DEAA] hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
          title={globeSettings.autoRotate ? 'Pause rotation' : 'Resume rotation'}
        >
          {globeSettings.autoRotate ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rotate</span>
            </>
          )}
        </button>

        {globeSettings.enableZoom && (
          <>
            <div className="h-4 w-px bg-white/15" />
            <button
              onClick={() => handleZoomStep(0.82)}
              className="p-1.5 rounded-lg text-[#F5F1E8]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoomStep(1.22)}
              className="p-1.5 rounded-lg text-[#F5F1E8]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
