import confGeneralAssemblyImg from '../assets/images/conf_general_assembly_1794499905607.jpg';
import confDiplomaticDebateImg from '../assets/images/conf_diplomatic_debate_1794499905894.jpg';
import confAwardsGalaImg from '../assets/images/conf_awards_gala_1794499907235.jpg';

export const DEFAULT_EXPERIENCE_IMAGE = confGeneralAssemblyImg;

export const LEGACY_IMAGE_MAP: Record<string, string> = {
  '/src/assets/images/conf_general_assembly_1794499905607.jpg': confGeneralAssemblyImg,
  '/src/assets/images/conf_diplomatic_debate_1794499905894.jpg': confDiplomaticDebateImg,
  '/src/assets/images/conf_awards_gala_1794499907235.jpg': confAwardsGalaImg,
};

export interface Committee {
  id: string;
  name: string;
  acronym: string;
  category: 'Crisis Simulation' | 'Parliamentary / Lok Sabha' | 'Specialized Agency' | 'Specialized Sports Committee';
  topic: string;
  secondaryTopic?: string;
  description: string;
  agendaSummary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  size: string;
  chairs: string[];
  rulesOfProcedure: string;
  studyGuideSummary: string;
  keyIssues: string[];
  accentColor: string;
  iconType: 'marvel' | 'parliament' | 'unsc' | 'ipl';
}

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  title: string;
  quoteTitle: string;
  experienceBadge: string;
  statement: string;
  highlights: string[];
  initials: string;
  photo?: string;
}

export interface GlobeSettings {
  autoRotate: boolean;
  rotationSpeed: number;
  showCountryBorders: boolean;
  showFlags: boolean;
  showAtmosphere: boolean;
  showStars: boolean;
  enableZoom: boolean;
  initialZoom: number;
  focusZoom: number;
  highlightColor: string;
}

export const DEFAULT_GLOBE_SETTINGS: GlobeSettings = {
  autoRotate: true,
  rotationSpeed: 0.25,
  showCountryBorders: true,
  showFlags: true,
  showAtmosphere: true,
  showStars: true,
  enableZoom: true,
  initialZoom: 5.8,
  focusZoom: 3.7,
  highlightColor: '#D6B875',
};

export interface FeaturePillar {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  metric: string;
  metricLabel: string;
  bulletPoints: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  caption: string;
  quote: string;
  speaker: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Committees' | 'Registration' | 'Logistics';
}

export interface RegistrationTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  formType: 'delegate' | 'delegation' | 'secretariat';
}

export const OFFICIAL_LOGO_URL = './assets/aistudio/Gemini_Generated_Image_9j9k5v9j9k5v9j9k_6db230c7.png';

export const BRAND_DATA = {
  name: 'HORIZON MUN',
  tagline: 'Where Diplomacy Meets Possibility.',
  heroSubtitle: 'Empowering the next generation of global leaders.',
  aboutText:
    'At Horizon MUN, we envision a generation empowered by knowledge, guided by integrity, and united by the pursuit of meaningful change. We aspire to cultivate intellectual curiosity, diplomatic acumen, critical thinking, and exemplary leadership. Through constructive discourse and the exchange of diverse perspectives, we seek to nurture mutual respect, bridge differences, and inspire solutions to pressing challenges. Our mission transcends debate; we strive to empower voices, challenge conventions, foster global consciousness, and transform the ideals of diplomacy into a lasting commitment to progress, peace, and collective responsibility.',
  dates: 'January 3, 2027 (One-Day Summit)',
  countdownTarget: '2027-01-03T09:00:00', // Countdown target to 3 Jan
  location: 'International Diplomatic Hall & Virtual Hybrid Chambers',
  edition: '2027 Annual Summit',
  // Official Delegate Registration Form supplied by user
  defaultGoogleFormUrl: 'https://forms.gle/sHAMJduFCgf6n27AA',
  // Link space for Secretariat Members and Rapporteurs
  secretariatFormUrl: 'https://forms.gle/sHAMJduFCgf6n27AA',
  rapporteurFormUrl: 'https://forms.gle/sHAMJduFCgf6n27AA',
  email: 'secretariat@horizonmun.org',
  instagram: '@horizonmun_official',
  linkedin: 'linkedin.com/company/horizon-mun',
  logoUrl: OFFICIAL_LOGO_URL,
};

export const FOUNDERS: FounderProfile[] = [
  {
    id: 'founder',
    name: 'Ayaan Chawla',
    role: 'Founder',
    title: 'Founder',
    quoteTitle: 'About the Founder',
    experienceBadge: '',
    statement:
      'As the Founder of Horizon MUN, drawing upon my experience of 25+ Model United Nations conferences and internships, I aspire to establish a platform where knowledge transcends boundaries, diplomacy fosters understanding, and kindness prevails alongside conviction. My vision is to empower young voices, cultivate intellectual curiosity, nurture confident leaders, and instil the values of mutual respect, critical thinking, and global awareness, making every delegate’s experience meaningful, transformative, and truly unforgettable.',
    highlights: [],
    initials: 'AC',
    photo: './assets/aistudio/founder__9ed592d6.jpeg', // Editable in Admin
  },
  {
    id: 'co-founder',
    name: 'Aayan Sharma',
    role: 'Co-Founder',
    title: 'Co-Founder',
    quoteTitle: 'About the Co-Founder',
    experienceBadge: '',
    statement:
      'A passionate MUN enthusiast, aspiring leader, and strategic thinker, serving as the Co-Founder of Horizon Model United Nations. With a deep interest in diplomacy, international relations, public speaking, and crisis management, I believe in the power of discussion, negotiation, and innovative thinking. Through Horizon MUN, I aspire to create an engaging platform where young minds can challenge perspectives, develop leadership skills, and discover their potential as future decision-makers.',
    highlights: [],
    initials: 'AS',
    photo: './assets/aistudio/co_founder_0a58e130.jpeg', // Editable in Admin
  },
];

export const COMMITTEES: Committee[] = [
  {
    id: 'mcucc',
    name: 'Marvel Continuous Crisis Committee',
    acronym: 'MCUCC',
    category: 'Crisis Simulation',
    topic: 'Multiversal Incursions, The Sokovia Accords & Strategic Defense Initiative',
    secondaryTopic: 'Extraterrestrial Planetary Defense & Global Sovereignty in Post-Incursion Eras',
    description: 'An elite, high-octane continuous crisis cabinet immersing delegates in the volatile geopolitics of the Marvel Universe. Delegates portray superhero council members, national security advisors, and extraterrestrial envoys balancing superpowered accountability against planetary survival.',
    agendaSummary: 'Delegates wield real-time portfolio directives, espionage communiqués, covert technology deployment, and press leaks to neutralize multiversal incursions and navigate jurisdictional gridlock.',
    difficulty: 'Expert',
    size: '20 Cabinet Portfolio Roles',
    chairs: ['Crisis Director', 'Assistant Director'],
    rulesOfProcedure: 'Continuous Crisis Procedure: Personal Directives, Intelligence Cables, Joint Backroom Operations',
    studyGuideSummary: 'Includes classified SHIELD archives, Sokovia Accords treaty text, Stark Industries aerospace blueprints, and multiversal quantum tether mechanics.',
    keyIssues: [
      'Legal jurisdiction over extraterrestrial & multiversal threats',
      'Balancing civil liberties against preemptive superhero intervention',
      'Sub-rosa resource conflicts over Vibranium & cosmic artifacts',
    ],
    accentColor: '#E23636',
    iconType: 'marvel',
  },
  {
    id: 'lok-sabha',
    name: 'Lok Sabha (House of the People)',
    acronym: 'Lok Sabha',
    category: 'Parliamentary / Lok Sabha',
    topic: 'Comprehensive Electoral Reforms, Cooperative Federalism & National Security Directives',
    secondaryTopic: 'Fiscal Autonomy of States, Border Infrastructure & Delimitation Strategies',
    description: 'Simulating the vibrant parliamentary democracy of the Indian Republic. Members of Parliament represent treasury and opposition benches in fiery, substantive Hindi and English legislative debates on constitutional governance, internal security, and economic parity.',
    agendaSummary: 'Debating structural bills, calling attention motions, zero-hour submissions, and legislative amendments addressing electoral transparency and state-centre fiscal federalism.',
    difficulty: 'Intermediate',
    size: '55 Parliamentarians (Treasury & Opposition)',
    chairs: ['Speaker of the House', 'Deputy Speaker'],
    rulesOfProcedure: 'Lok Sabha Rules of Procedure and Conduct of Business with Calling Attention & Zero Hour',
    studyGuideSummary: 'Comprehensive dossiers covering the Law Commission reports on electoral reform, Finance Commission state allocations, and constitutional delimitation clauses.',
    keyIssues: [
      'Simultaneous elections (One Nation, One Election) constitutional viability',
      'Re-evaluating GST compensation mechanisms and federal fiscal devolution',
      'Strategic infrastructure fortification along northern and western borders',
    ],
    accentColor: '#FF9933',
    iconType: 'parliament',
  },
  {
    id: 'unsc',
    name: 'United Nations Security Council',
    acronym: 'UNSC',
    category: 'Specialized Agency',
    topic: 'Mitigating Escalation in Modern Autonomous Warfare & Sub-Threshold Cyber Conflicts',
    secondaryTopic: 'Frameworks for Neutrality and Sovereignty in Contested Maritime Corridors',
    description: 'The premier organ responsible for maintaining international peace and security confronts emerging warfare doctrines, lethal autonomous systems (LAWS), and deniable state-sponsored cyber offensives.',
    agendaSummary: 'With rapid advances in algorithmic command nodes and cross-border cyber incursions, the Council must draft enforceable binding resolutions under Chapter VII of the UN Charter.',
    difficulty: 'Expert',
    size: '15 Member States (Strict P5 + E10 Dynamics)',
    chairs: ['President of the Security Council'],
    rulesOfProcedure: 'UNSC Modified Rules with P5 Veto Protocol & P-Stipulated Directives',
    studyGuideSummary: 'Examines asymmetric kinetic responses to cyber breaches, the Tallinn Manual 2.0 interface with international humanitarian law, and Geneva Convention Article 36 weapon reviews.',
    keyIssues: [
      'Attribution protocols for multi-state proxy infrastructure',
      'Standardized definition of threshold cyber acts of war',
      'Pre-emptive strike prohibitions for AI-assisted kinetic nodes',
    ],
    accentColor: '#D6B875',
    iconType: 'unsc',
  },
  {
    id: 'ipl',
    name: 'Indian Premier League (Auction & Governance Crisis)',
    acronym: 'IPL Crisis',
    category: 'Specialized Sports Committee',
    topic: 'Mega-Auction War Rooms, Player Economics, Franchise Governance & Global Cricket Diplomacy',
    secondaryTopic: 'Anti-Corruption Protocols, Media Rights Valuation & Emerging League Geopolitics',
    description: 'A revolutionary, high-stakes sports management and crisis committee. Delegates represent franchise owners, BCCI governors, and broadcast moguls balancing multi-million dollar auction bidding budgets, player retention mathematics, and ethical sports diplomacy.',
    agendaSummary: 'Engage in live auction rounds with real-time purse budgets, player health crises, sudden trade windows, and sponsor regulatory investigations.',
    difficulty: 'Intermediate',
    size: '10 Franchise Ownership Tables + Governing Council',
    chairs: ['Lead Auctioneer & Director'],
    rulesOfProcedure: 'Dynamic Sports Auction & Executive Board Crisis Procedure with Purse Bidding Rounds',
    studyGuideSummary: 'Complete franchise purse spreadsheets, player base price tiers, international player overseas caps, and ICC-BCCI broadcast rights contracts.',
    keyIssues: [
      'Strategic purse allocation and bidding game theory during mega-auctions',
      'Mitigating workload management clashes between national teams and franchises',
      'Integrity guidelines and legal safeguards against illegal sports wagering syndicates',
    ],
    accentColor: '#1E88E5',
    iconType: 'ipl',
  },
];

export const WHY_HORIZON_PILLARS: FeaturePillar[] = [
  {
    id: 'diplomatic-excellence',
    title: 'Diplomatic Excellence',
    shortDesc: 'Authentic procedural rigor shaped by leadership with 25+ MUN conferences on the national and global circuit.',
    fullDesc: 'We move beyond performative speeches. Horizon MUN delegates navigate complex multilateral resolution drafting, rigorous clause-by-clause amendments, and realistic geopolitical friction that mirror real diplomatic embassies.',
    metric: '25+',
    metricLabel: 'Founders Circuit MUNs',
    bulletPoints: [
      'Comprehensive, peer-reviewed 40+ page background guides',
      'Chairs with international circuit Best Delegate credentials',
      'Realistic unmoderated caucus simulation and bloc coalition building',
    ],
  },
  {
    id: 'leadership-development',
    title: 'Leadership Development',
    shortDesc: 'Intensive public diplomacy, executive negotiation, and high-pressure strategic oratory.',
    fullDesc: 'Empowering delegates to articulate nuanced geopolitical stances under high-stakes committee scrutiny. Receive actionable 1-on-1 executive feedback from seasoned executive board chairs.',
    metric: '100%',
    metricLabel: 'Individual Executive Feedback Provided',
    bulletPoints: [
      'Pre-conference diplomatic position paper masterclasses',
      'Real-time crisis directive response feedback',
      'Structured leadership mentorship for first-time delegation heads',
    ],
  },
  {
    id: 'critical-thinking',
    title: 'Critical Thinking',
    shortDesc: 'Tackling multi-dimensional global challenges without black-and-white simplifications.',
    fullDesc: 'Delegates grapple with economic trade-offs, sovereignty paradoxes, and the conflicting national interests of member states and simulated cabinets. No canned answers or generic resolutions are allowed.',
    metric: '4',
    metricLabel: 'Specialized High-Impact Chambers',
    bulletPoints: [
      'Multi-variable crisis scenarios with unexpected midnight updates',
      'Evidence-based resolution scrutiny based on constitutional & treaty law',
      'Balancing national and franchise interest against collective imperatives',
    ],
  },
  {
    id: 'global-networking',
    title: 'Global Networking',
    shortDesc: 'Connect with 650+ visionary youth leaders and diplomatic mentors from across the circuit.',
    fullDesc: 'A prestigious network that lasts far beyond the closing gavel. Forge lifelong alliances with peers aspiring to join civil services, legal courts, corporate strategy desks, and global think tanks.',
    metric: '30+',
    metricLabel: 'Participating Institutions',
    bulletPoints: [
      'Dedicated diplomatic foyer networking sessions and delegate gala',
      'Keynote addresses by accredited diplomats and parliamentary mentors',
      'Exclusive Horizon MUN Global Fellows network',
    ],
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'committee-sessions',
    title: 'Substantive Committee Sessions',
    tag: 'Chamber Proceedings',
    image: confGeneralAssemblyImg,
    caption: 'Experience the electric atmosphere of full assembly deliberations, formal debate, and precision clause-by-clause scrutiny in majestic diplomatic chambers.',
    quote: 'Speaking on behalf of our delegation before a packed chamber was an unforgettable milestone in my diplomatic journey.',
    speaker: 'Delegate, Horizon MUN',
  },
  {
    id: 'negotiations',
    title: 'High-Stakes Diplomatic Negotiations',
    tag: 'Unmoderated Caucus & Crisis',
    image: confDiplomaticDebateImg,
    caption: 'Master the art of consensus building during intense unmoderated caucuses and fast-moving crisis backroom operations.',
    quote: 'You learn more about negotiation and strategic leadership in three hours of crisis caucus than in an entire semester of textbooks.',
    speaker: 'Crisis Delegate, Horizon MUN',
  },
  {
    id: 'awards-gala',
    title: 'Prestigious Awards & Recognition',
    tag: 'Closing Ceremonies',
    image: confAwardsGalaImg,
    caption: 'Celebrate intellectual courage and collaborative triumphs at the Grand Closing Gala, featuring hand-crafted gold gavels and recognition.',
    quote: 'Winning Best Delegation was exhilarating, but the shared respect with rival blocs was the true prize.',
    speaker: 'Faculty Advisor & Delegation Lead',
  },
];

export const REGISTRATION_TIERS: RegistrationTier[] = [
  {
    id: 'early-bird',
    name: 'Delegate Registration',
    badge: 'Official Google Form Open',
    price: 'Standard',
    period: 'Summit Opening: January 3, 2027',
    description: 'Direct delegate admissions portal for MCUCC, Lok Sabha, UNSC, and IPL Auction.',
    features: [
      'Official access to chosen committee chambers (MCUCC, Lok Sabha, UNSC, IPL)',
      'Direct priority allocation for preferred portfolio/country/franchise',
      'Official Horizon MUN Delegate Folder & Lapel Pin',
      'Exclusive Pre-Conference Masterclass with Founders',
      'Certificate of Diplomatic Participation with Official Stamp',
      'Full eligibility for Best Delegate Gavels & Commendations',
    ],
    isPopular: true,
    formType: 'delegate',
  },
  {
    id: 'delegation',
    name: 'School / University Delegation',
    badge: 'Institutional Bloc',
    price: 'Delegation',
    period: 'For Groups & MUN Societies',
    description: 'Coordinated admissions for school teams, collegiate societies, and institutional contingents.',
    features: [
      'Coordinated allocations across all 4 flagship committees',
      'Complimentary Faculty Advisor / Head Delegate pass',
      'Eligibility for Prestigious Best Delegation Trophy',
      'Direct Secretariat priority support channel',
      'Institutional recognition in the Summit Program',
    ],
    formType: 'delegation',
  },
];

export const IMPORTANT_DATES = [
  { date: 'Active Now', event: 'Delegate Registration Live on Google Forms', status: 'Active' },
  { date: 'December 20, 2026', event: 'First Wave Portfolio & Country Allocations', status: 'Upcoming' },
  { date: 'December 28, 2026', event: 'Position Papers & Directives Dossier Deadline', status: 'Upcoming' },
  { date: 'January 3, 2027', event: 'One-Day Summit: Opening Ceremony, Committee Sessions & Awards Gala', status: 'Milestone' },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Horizon MUN?',
    answer: 'Horizon MUN is a premier, youth-led Model United Nations and parliamentary conference. Guided by our founders’ experience across 25+ conferences, Horizon MUN brings together ambitious delegates across 4 powerhouse committees: MCUCC (Marvel Crisis), Lok Sabha, UNSC, and IPL Auction Crisis.',
  },
  {
    id: 'faq-2',
    category: 'Registration',
    question: 'How do I register for Horizon MUN?',
    answer: 'Registration is live right now via our official Google Forms portal at https://forms.gle/sHAMJduFCgf6n27AA. Simply choose your committee preferences (MCUCC, Lok Sabha, UNSC, or IPL), submit your credentials, and our Delegate Affairs team will confirm your allocation.',
  },
  {
    id: 'faq-3',
    category: 'Committees',
    question: 'What are the 4 committees for this edition?',
    answer: 'This edition of Horizon MUN features four dynamic, distinct committees: 1) MCUCC (Marvel Continuous Crisis Committee) navigating multiversal incursions, 2) Lok Sabha debating constitutional and electoral reforms, 3) UNSC confronting autonomous warfare and cyber escalations, and 4) IPL Auction Crisis managing franchise mega-auctions and sports governance.',
  },
  {
    id: 'faq-4',
    category: 'Committees',
    question: 'Do I need prior MUN experience to participate?',
    answer: 'Not at all! While committees like UNSC and MCUCC provide thrilling depth for seasoned debaters, Lok Sabha and IPL Auction offer accessible, engaging formats with supportive executive chairs ready to guide first-time delegates.',
  },
  {
    id: 'faq-5',
    category: 'Logistics',
    question: 'When will the conference take place?',
    answer: 'Horizon MUN convenes as a full-day, one-day conference on January 3, 2027, featuring both in-person grand chambers and verified virtual hybrid access for international delegates.',
  },
  {
    id: 'faq-6',
    category: 'Registration',
    question: 'Who can register as a delegation?',
    answer: 'Schools, colleges, universities, and independent MUN clubs can register as a collective delegation to compete for the Best Delegation Trophy and receive coordinated allocations across MCUCC, Lok Sabha, UNSC, and IPL.',
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'How can I contact the founders and organizing team?',
    answer: 'You can reach out directly to the organizing team at secretariat@horizonmun.org, connect with our Instagram (@horizonmun_official), or use the interactive Contact Us form on this website. Our team responds within 24 hours.',
  },
];
