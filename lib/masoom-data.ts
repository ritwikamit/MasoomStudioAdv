export interface ExifData {
  lens: string;
  camera: string;
  setting: string;
}

export interface PhotoFrame {
  id: string;
  title: string;
  scriptHighlight: string;
  category: 'weddings' | 'pre-wedding' | 'portraits' | 'candid';
  categoryLabel: string;
  couple: string;
  location: string;
  year: string;
  imageUrl: string;
  aspect: 'landscape' | 'portrait';
  imagePosition?: string;
  description: string;
  emotionalExcerpt: string;
  exif: ExifData;
}

export interface CinemaFilm {
  id: string;
  youtubeId?: string;
  youtubeUrl?: string;
  videoSrc?: string;
  instagramUrl?: string;
  reelCode?: string;
  isPortrait?: boolean;
  objectPosition?: string;
  title: string;
  scriptHighlight: string;
  couple: string;
  location: string;
  year: string;
  month: string;
  duration: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  aiConceptPrompt: string;
  synopsis: string;
  emotionalHook: string;
  category: 'palace' | 'royal' | 'intimate' | 'engagement';
}

export interface InstagramReelItem {
  id: string;
  code: string;
  instagramUrl: string;
  embedUrl: string;
  videoSrc: string;
  posterUrl: string;
  title: string;
  couple: string;
  location: string;
  caption: string;
  isPortrait: boolean;
  category: 'hero' | 'portrait' | 'bridal' | 'story' | 'footer';
}

export interface CommissionService {
  id: string;
  number: string;
  title: string;
  scriptHighlight: string;
  tagline: string;
  description: string;
  deliverables: string[];
  humanNote: string;
  dayLabel: string;
  phaseTitle: string;
}

export interface VenueInstallation {
  id: string;
  title: string;
  venue: string;
  location: string;
  atmosphereTag: string;
  summary: string;
  lightingNotes: string;
  acousticNotes: string;
  imageUrl: string;
  secondaryImageUrl: string;
  dateSeason: string;
}

export interface MapLocationPin {
  id: string;
  city: string;
  venue: string;
  state: string;
  couple: string;
  year: string;
  xPercent: number;
  yPercent: number;
  lat: string;
  lng: string;
  mapQuery: string;
  zoom: number;
  description: string;
  imageUrl: string;
  filmId?: string;
}

export interface GratitudeNote {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  imageUrl: string;
}

export interface StoryScene {
  sceneNumber: string;
  year: string;
  title: string;
  scriptTitle: string;
  headline: string;
  narrative: string;
  highlightStat: string;
  imageUrl: string;
  secondaryImageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services & Packages' | 'Films & Photos' | 'Booking & Travel';
}

export const STUDIO_INFO = {
  name: 'Masoom Studio',
  founder: 'Masoom Javed',
  est: '2018',
  logoUrl: '/MasoomStudioLogo.png',
  tagline: 'Vibrant, fun and natural wedding stories',
  subTagline: 'Real Moments · Wedding Films & Candid Photography',
  address:
    'Pillar No. 42, Pandey Palace, Plot 2, Bailey Road, near Paras Hospital, Patna, Bihar 800014',
  shortAddress: 'Pillar No. 42, Bailey Road, near Paras Hospital, Patna',
  phoneNumber: '074884 58213',
  phonePrimaryUrl: 'tel:07488458213',
  whatsappNumber: '917488458213',
  whatsappUrl:
    'https://wa.me/917488458213?text=Hello%20Masoom%20Studio%2C%20we%20are%20planning%20our%20wedding%20and%20would%20love%20to%20know%20more%20about%20your%20photography%20and%20films.',
  email: 'contact@masoomstudio.in',
  emailUrl: 'mailto:contact@masoomstudio.in',
  instagram: 'https://www.instagram.com/masoomstudio.in/?hl=en',
  instagramHandle: '@masoomstudio.in',
  youtube: 'https://www.youtube.com/@masoomstudio',
  youtubeHandle: '@masoomstudio',
  facebook: 'https://www.facebook.com/masoomstudio.in/',
  facebookHandle: 'masoomstudio.in',
  wedmegood: 'https://www.wedmegood.com/profile/masoom-studio-25237158',
  mapsUrl:
    'https://www.google.com/maps/place/Masoom+Studio/@25.6063123,85.0794338,17z/data=!3m1!4b1!4m6!3m5!1s0x6b8ac3e466df48ab:0x438a05a2030c3f8e!8m2!3d25.6063075!4d85.0820087!16s%2Fg%2F11y372cxr3?entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=25.6063075,85.0820087+(Masoom+Studio)&t=m&z=17&ie=UTF8&iwloc=&output=embed',
  studioHours: 'Tuesday to Sunday · Visit us on Bailey Road, Patna',
};

// ============================================================================
// ALL 13 INSTAGRAM REELS PROVIDED BY THE USER
// Optimized local fast-start MP4 videos & uncropped poster images
// ============================================================================
export const INSTAGRAM_REELS: InstagramReelItem[] = [
  {
    id: 'reel-1',
    code: 'Dc1rREUTHPB',
    instagramUrl: 'https://www.instagram.com/reel/Dc1rREUTHPB/',
    embedUrl: 'https://www.instagram.com/reel/Dc1rREUTHPB/embed/',
    videoSrc: '/reels/Dc1rREUTHPB.mp4',
    posterUrl: '/reels/Dc1rREUTHPB.jpg',
    title: 'One Wedding · A Thousand Emotions',
    couple: 'Kunika & Tushar',
    location: 'Raj Resort, Patna',
    caption:
      'One wedding, a thousand feelings, and one story to remember forever — captured simply and honestly.',
    isPortrait: false,
    category: 'footer',
  },
  {
    id: 'reel-2',
    code: 'DV30vU6gci7',
    instagramUrl: 'https://www.instagram.com/reel/DV30vU6gci7/',
    embedUrl: 'https://www.instagram.com/reel/DV30vU6gci7/embed/',
    videoSrc: '/reels/DV30vU6gci7.mp4',
    posterUrl: '/reels/DV30vU6gci7.jpg',
    title: 'Seema & Sayan · Two Hearts, One Journey',
    couple: 'Seema & Sayan',
    location: 'Patna, Bihar',
    caption:
      'Two hearts on one beautiful journey. Seema and Sayan’s wedding moments full of warmth, laughter, and love.',
    isPortrait: false,
    category: 'hero',
  },
  {
    id: 'reel-10',
    code: 'DVDFTAZkQQ_',
    instagramUrl: 'https://www.instagram.com/reel/DVDFTAZkQQ_/',
    embedUrl: 'https://www.instagram.com/reel/DVDFTAZkQQ_/embed/',
    videoSrc: '/reels/DVDFTAZkQQ_.mp4',
    posterUrl: '/reels/DVDFTAZkQQ_.jpg',
    title: 'Written in Destiny & Sealed Forever',
    couple: 'Amit & Bride',
    location: 'Gargee Grand, Patna',
    caption:
      'A love story made for each other — surrounded by happy parents, family blessings, and joyful celebrations.',
    isPortrait: false,
    category: 'hero',
  },
  {
    id: 'reel-11',
    code: 'DUnQAVuCRG6',
    instagramUrl: 'https://www.instagram.com/reel/DUnQAVuCRG6/',
    embedUrl: 'https://www.instagram.com/reel/DUnQAVuCRG6/embed/',
    videoSrc: '/reels/DUnQAVuCRG6.mp4',
    posterUrl: '/reels/DUnQAVuCRG6.jpg',
    title: 'Saheba & Tabish · Love, Faith & Togetherness',
    couple: 'Saheba & Tabish',
    location: 'Patna, Bihar',
    caption:
      'Some stories are meant to last forever. Saheba and Tabish’s celebration of love, family, and togetherness.',
    isPortrait: false,
    category: 'hero',
  },
  {
    id: 'reel-13',
    code: 'C9J1JVCyNYa',
    instagramUrl: 'https://www.instagram.com/reel/C9J1JVCyNYa/',
    embedUrl: 'https://www.instagram.com/reel/C9J1JVCyNYa/embed/',
    videoSrc: '/reels/C9J1JVCyNYa.mp4',
    posterUrl: '/reels/C9J1JVCyNYa.jpg',
    title: 'Tushar & Sonali · Grand Wedding Celebration',
    couple: 'Tushar & Sonali',
    location: 'Hotel Maurya, Patna',
    caption:
      'Big smiles, family hugs, and unforgettable wedding rituals filmed by Masoom Studio in Patna.',
    isPortrait: false,
    category: 'hero',
  },
  {
    id: 'reel-9',
    code: 'Dc7vsFARGV9',
    instagramUrl: 'https://www.instagram.com/reel/Dc7vsFARGV9/',
    embedUrl: 'https://www.instagram.com/reel/Dc7vsFARGV9/embed/',
    videoSrc: '/reels/Dc7vsFARGV9.mp4',
    posterUrl: '/reels/Dc7vsFARGV9.jpg',
    title: 'Dr. Govind & Dr. Swati · A New Beginning',
    couple: 'Dr. Govind & Dr. Swati',
    location: 'Hotel Mantra, Patna',
    caption:
      'Two doctors starting a lifetime together — real smiles, warm blessings, and natural moments.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-3',
    code: 'DYnewlVTZjD',
    instagramUrl: 'https://www.instagram.com/reel/DYnewlVTZjD/',
    embedUrl: 'https://www.instagram.com/reel/DYnewlVTZjD/embed/',
    videoSrc: '/reels/DYnewlVTZjD.mp4',
    posterUrl: '/reels/DYnewlVTZjD.jpg',
    title: 'Tu Jo Mili · Sweet Wedding Memories',
    couple: 'Anupam & Aishwarya',
    location: 'Patna Sahib, Bihar',
    caption:
      'From sweet glances to happy family dances — a wedding story full of heart and joy.',
    isPortrait: true,
    category: 'story',
  },
  {
    id: 'reel-4',
    code: 'C8WxTDaS-Bu',
    instagramUrl: 'https://www.instagram.com/reel/C8WxTDaS-Bu/',
    embedUrl: 'https://www.instagram.com/reel/C8WxTDaS-Bu/embed/',
    videoSrc: '/reels/C8WxTDaS-Bu.mp4',
    posterUrl: '/reels/C8WxTDaS-Bu.jpg',
    title: 'When Two Hearts Speak as One',
    couple: 'Atish & Nisha',
    location: 'Hotel Maurya, Patna',
    caption:
      'Natural couple portraits and joyful wedding moments captured by Masoom Studio.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-5',
    code: 'DcyEnjMhTbO',
    instagramUrl: 'https://www.instagram.com/reel/DcyEnjMhTbO/',
    embedUrl: 'https://www.instagram.com/reel/DcyEnjMhTbO/embed/',
    videoSrc: '/reels/DcyEnjMhTbO.mp4',
    posterUrl: '/reels/DcyEnjMhTbO.jpg',
    title: 'Classic Red Bridal Glow',
    couple: 'Bridal Portrait',
    location: 'Patna, Bihar',
    caption:
      'A timeless red bridal look — calm, graceful, and full of happiness before the wedding rituals begin.',
    isPortrait: true,
    category: 'bridal',
  },
  {
    id: 'reel-6',
    code: 'DbXVjKzTSKp',
    instagramUrl: 'https://www.instagram.com/reel/DbXVjKzTSKp/',
    embedUrl: 'https://www.instagram.com/reel/DbXVjKzTSKp/embed/',
    videoSrc: '/reels/DbXVjKzTSKp.mp4',
    posterUrl: '/reels/DbXVjKzTSKp.jpg',
    title: 'The Bride’s First Look',
    couple: 'Bridal Highlight',
    location: 'Panache Banquets, Patna',
    caption:
      'Getting ready for the biggest day of her life — real smiles and quiet excitement.',
    isPortrait: true,
    category: 'bridal',
  },
  {
    id: 'reel-7',
    code: 'DECnLuPISkp',
    instagramUrl: 'https://www.instagram.com/reel/DECnLuPISkp/',
    embedUrl: 'https://www.instagram.com/reel/DECnLuPISkp/embed/',
    videoSrc: '/reels/DECnLuPISkp.mp4',
    posterUrl: '/reels/DECnLuPISkp.jpg',
    title: 'Grace in Every Step',
    couple: 'Bridal & Couple Reel',
    location: 'Patna, Bihar',
    caption:
      'Beautiful wedding attire, natural movement, and effortless happiness.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-8',
    code: 'DdyyL4tBg4O',
    instagramUrl: 'https://www.instagram.com/reel/DdyyL4tBg4O/',
    embedUrl: 'https://www.instagram.com/reel/DdyyL4tBg4O/embed/',
    videoSrc: '/reels/DdyyL4tBg4O.mp4',
    posterUrl: '/reels/DdyyL4tBg4O.jpg',
    title: 'Soft Light & Real Smiles',
    couple: 'Portrait Reel',
    location: 'Patna, Bihar',
    caption:
      'Simple, natural portraits that bring out who you truly are on your wedding day.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-12',
    code: 'C9NMpA0N67l',
    instagramUrl: 'https://www.instagram.com/reel/C9NMpA0N67l/',
    embedUrl: 'https://www.instagram.com/reel/C9NMpA0N67l/embed/',
    videoSrc: '/reels/C9NMpA0N67l.mp4',
    posterUrl: '/reels/C9NMpA0N67l.jpg',
    title: 'Patna Celebrations & Togetherness',
    couple: 'Patna Stories',
    location: 'Gandhi Maidan, Patna',
    caption:
      'Celebrating love, family traditions, and vibrant weddings across Patna and Bihar.',
    isPortrait: true,
    category: 'story',
  },
  {
    id: 'reel-footer-1',
    code: 'DCYrmYgyjns',
    instagramUrl: 'https://www.instagram.com/reel/DCYrmYgyjns/',
    embedUrl: 'https://www.instagram.com/reel/DCYrmYgyjns/embed/',
    videoSrc: '/reels/DCYrmYgyjns.mp4',
    posterUrl: '/reels/DCYrmYgyjns.jpg',
    title: 'Eternal Vows & Cinematic Grandeur',
    couple: 'Luxury Wedding Celebration',
    location: 'Patna, Bihar',
    caption:
      'Sweeping cinematic frames, sacred vows, and unforgettable memories captured by Masoom Studio.',
    isPortrait: false,
    category: 'footer',
  },
  {
    id: 'reel-footer-2',
    code: 'C_h6bbOyC9j',
    instagramUrl: 'https://www.instagram.com/reel/C_h6bbOyC9j/',
    embedUrl: 'https://www.instagram.com/reel/C_h6bbOyC9j/embed/',
    videoSrc: '/reels/C_h6bbOyC9j.mp4',
    posterUrl: '/reels/C_h6bbOyC9j.jpg',
    title: 'Golden Hour Wedding Rituals',
    couple: 'Royal Wedding Film',
    location: 'Patna, Bihar',
    caption:
      'Warm sunlight, emotional blessings, and family happiness framed in widescreen elegance.',
    isPortrait: false,
    category: 'footer',
  },
];

export const FOOTER_REELS: InstagramReelItem[] = [
  INSTAGRAM_REELS.find((r) => r.code === 'DCYrmYgyjns') || INSTAGRAM_REELS[INSTAGRAM_REELS.length - 2],
  INSTAGRAM_REELS.find((r) => r.code === 'C_h6bbOyC9j') || INSTAGRAM_REELS[INSTAGRAM_REELS.length - 1],
];

// ============================================================================
// HEADER HERO VIDEOS (All widescreen & featured reels, framed so faces are NEVER cut)
// ============================================================================
export const HEADER_HERO_FILMS: CinemaFilm[] = [
  {
    id: 'f-reel-1',
    videoSrc: '/reels/DV30vU6gci7.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DV30vU6gci7/',
    reelCode: 'DV30vU6gci7',
    isPortrait: false,
    youtubeId: 'xtleDC8RPVE',
    youtubeUrl: 'https://youtu.be/xtleDC8RPVE',
    title: 'Seema & Sayan · Wedding Film',
    scriptHighlight: 'two hearts, one journey',
    couple: 'Seema & Sayan',
    location: 'Patna, Bihar',
    year: '2025',
    month: 'December 2025',
    duration: 'Wedding Film',
    thumbnailUrl: '/reels/DV30vU6gci7.jpg',
    heroImageUrl: '/reels/DV30vU6gci7.jpg',
    aiConceptPrompt: 'Seema & Sayan wedding celebration in Patna',
    synopsis:
      'Two hearts on one beautiful journey. Seema and Sayan’s wedding filmed with natural warmth, family laughter, and real emotions.',
    emotionalHook: 'Every smile, blessing, and ritual captured just as it happened.',
    category: 'palace',
  },
  {
    id: 'f-reel-2',
    videoSrc: '/reels/DVDFTAZkQQ_.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DVDFTAZkQQ_/',
    reelCode: 'DVDFTAZkQQ_',
    isPortrait: false,
    youtubeId: '4xLbf0G2LWM',
    youtubeUrl: 'https://youtu.be/4xLbf0G2LWM',
    title: 'Amit & Bride · Made for Each Other',
    scriptHighlight: 'made for each other',
    couple: 'Amit & Bride',
    location: 'Gargee Grand, Patna',
    year: '2025',
    month: 'November 2025',
    duration: 'Wedding Film',
    thumbnailUrl: '/reels/DVDFTAZkQQ_.jpg',
    heroImageUrl: '/reels/DVDFTAZkQQ_.jpg',
    aiConceptPrompt: 'Amit wedding celebration at Gargee Grand Patna',
    synopsis:
      'A joyful celebration surrounded by parents, cousins, and close friends — full of music, colour, and heartfelt vows.',
    emotionalHook: 'When two families come together in pure happiness.',
    category: 'royal',
  },
  {
    id: 'f-reel-3',
    videoSrc: '/reels/DUnQAVuCRG6.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DUnQAVuCRG6/',
    reelCode: 'DUnQAVuCRG6',
    isPortrait: false,
    youtubeId: 't_Ebe1aA2cE',
    youtubeUrl: 'https://youtu.be/t_Ebe1aA2cE',
    title: 'Saheba & Tabish · Forever Begins Here',
    scriptHighlight: 'forever begins',
    couple: 'Saheba & Tabish',
    location: 'Patna, Bihar',
    year: '2025',
    month: 'November 2025',
    duration: 'Wedding Film',
    thumbnailUrl: '/reels/DUnQAVuCRG6.jpg',
    heroImageUrl: '/reels/DUnQAVuCRG6.jpg',
    aiConceptPrompt: 'Saheba and Tabish wedding film in Patna',
    synopsis:
      'Saheba and Tabish’s celebration of love, faith, and family blessings, captured naturally by Masoom Studio.',
    emotionalHook: 'Real feelings that stay with your family for a lifetime.',
    category: 'palace',
  },
  {
    id: 'f-reel-4',
    videoSrc: '/reels/C9J1JVCyNYa.mp4',
    instagramUrl: 'https://www.instagram.com/reel/C9J1JVCyNYa/',
    reelCode: 'C9J1JVCyNYa',
    isPortrait: false,
    youtubeId: 'G-t4WBeBG5s',
    youtubeUrl: 'https://youtu.be/G-t4WBeBG5s',
    title: 'Tushar & Sonali · Grand Patna Wedding',
    scriptHighlight: 'family joy',
    couple: 'Tushar & Sonali',
    location: 'Hotel Maurya, Patna',
    year: '2025',
    month: 'October 2025',
    duration: 'Wedding Film',
    thumbnailUrl: '/reels/C9J1JVCyNYa.jpg',
    heroImageUrl: '/reels/C9J1JVCyNYa.jpg',
    aiConceptPrompt: 'Tushar and Sonali wedding at Hotel Maurya Patna',
    synopsis:
      'A vibrant wedding celebration at Hotel Maurya, balancing grand family traditions with sweet, quiet moments between the couple.',
    emotionalHook: 'Honest tears of joy and the warmth of home.',
    category: 'royal',
  },
  {
    id: 'f-reel-5',
    videoSrc: '/reels/Dc7vsFARGV9.mp4',
    instagramUrl: 'https://www.instagram.com/reel/Dc7vsFARGV9/',
    reelCode: 'Dc7vsFARGV9',
    isPortrait: false,
    objectPosition: '50% 35%',
    youtubeId: 'hLpffdS05t0',
    youtubeUrl: 'https://youtu.be/hLpffdS05t0',
    title: 'Dr. Govind & Dr. Swati · Unconditional Love',
    scriptHighlight: 'shared dreams',
    couple: 'Dr. Govind & Dr. Swati',
    location: 'Hotel Mantra, Patna',
    year: '2025',
    month: 'May 2025',
    duration: 'Wedding Film',
    thumbnailUrl: '/Gallary/imgi_12_793850137_17989749228160466_8054815104760056368_n.jpg',
    heroImageUrl: '/Gallary/imgi_12_793850137_17989749228160466_8054815104760056368_n.jpg',
    aiConceptPrompt: 'Dr Govind and Dr Swati wedding in Patna',
    synopsis:
      'Two doctors beginning their life together — filled with genuine laughter, family blessings, and vibrant celebrations.',
    emotionalHook: 'Simple, natural storytelling focused on real people.',
    category: 'intimate',
  },
  {
    id: 'f-reel-6',
    videoSrc: '/reels/Dc1rREUTHPB.mp4',
    instagramUrl: 'https://www.instagram.com/reel/Dc1rREUTHPB/',
    reelCode: 'Dc1rREUTHPB',
    isPortrait: false,
    objectPosition: '50% 38%',
    youtubeId: 'E8NBFn92vyE',
    youtubeUrl: 'https://youtu.be/E8NBFn92vyE',
    title: 'Kunika & Tushar · A Thousand Emotions',
    scriptHighlight: 'every emotion',
    couple: 'Kunika & Tushar',
    location: 'Raj Resort, Patna',
    year: '2025',
    month: 'November 2025',
    duration: 'Wedding Film',
    thumbnailUrl: '/reels/Dc1rREUTHPB.jpg',
    heroImageUrl: '/reels/Dc1rREUTHPB.jpg',
    aiConceptPrompt: 'Kunika and Tushar wedding at Raj Resort Patna',
    synopsis:
      'One wedding, a thousand emotions, and memories that bring the whole family back to this night every time they watch.',
    emotionalHook: 'Captured with heart by Masoom Studio, Patna.',
    category: 'engagement',
  },
];

export const CINEMA_FILMS: CinemaFilm[] = HEADER_HERO_FILMS;

// ============================================================================
// ALL UPLOADED GALLERY PHOTOS FROM .assets/Gallary (40+ Curated Frames)
// ============================================================================
const RAW_GALLERY_FILES: {
  file: string;
  title: string;
  couple: string;
  category: 'weddings' | 'pre-wedding' | 'portraits' | 'candid';
  categoryLabel: string;
  location: string;
  aspect: 'landscape' | 'portrait';
}[] = [
  {
    file: 'imgi_11_663089682_18088892522215915_6152286074647645901_n.jpg',
    title: 'The Sacred Sindoor Moment',
    couple: 'Kunika & Tushar',
    category: 'weddings',
    categoryLabel: 'Wedding Rituals',
    location: 'Raj Resort, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_12_793850137_17989749228160466_8054815104760056368_n.jpg',
    title: 'Evening Couple Portrait',
    couple: 'Dr. Govind & Dr. Swati',
    category: 'portraits',
    categoryLabel: 'Couple Portrait',
    location: 'Hotel Mantra, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_13_657521665_18125284714601336_3167577979393449239_n.jpg',
    title: 'Classic Red Bridal Portrait',
    couple: 'Sonali',
    category: 'portraits',
    categoryLabel: 'Bridal Portrait',
    location: 'Hotel Maurya, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_13_793721101_17989746675160466_7574323771512088453_n.jpg',
    title: 'Smiles Before the Mandap',
    couple: 'Seema & Sayan',
    category: 'candid',
    categoryLabel: 'Candid Moment',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_15_655763221_18131362612557368_1871368625891049134_n.jpg',
    title: 'Shower of Flower Petals',
    couple: 'Nilesh & Sweta',
    category: 'candid',
    categoryLabel: 'Candid Joy',
    location: 'Gargee Grand, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_16_499908086_2469059633493309_7705283396157562459_n.jpg',
    title: 'Golden Evening Walk',
    couple: 'Anupam & Aishwarya',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding Shoot',
    location: 'Patna Sahib',
    aspect: 'portrait',
  },
  {
    file: 'imgi_16_792820577_17989635195160466_3434238158816086773_n.jpg',
    title: 'Together Under the Lights',
    couple: 'Anupam & Aishwarya',
    category: 'pre-wedding',
    categoryLabel: 'Couple Shoot',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_17_503105050_1651482755555951_6932287454039178644_n.jpg',
    title: 'Reception First Dance',
    couple: 'Atish & Nisha',
    category: 'weddings',
    categoryLabel: 'Reception Night',
    location: 'Panache Banquets, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_17_796098376_17989748238160466_2019815211510768982_n.jpg',
    title: 'A Thousand Happy Feelings',
    couple: 'Kunika & Tushar',
    category: 'weddings',
    categoryLabel: 'Wedding Ceremony',
    location: 'Raj Resort, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_18_497727990_1409778160066701_723853030776704346_n.jpg',
    title: 'Graceful Bridal Look',
    couple: 'Aishwarya',
    category: 'portraits',
    categoryLabel: 'Bridal Portrait',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_19_502684304_1038221371226658_3951031615668310526_n.jpg',
    title: 'Haldi Morning Fun & Laughter',
    couple: 'Prince & Sonali',
    category: 'candid',
    categoryLabel: 'Haldi Ceremony',
    location: 'Amrapali Banquet, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_19_625845774_18098232941506507_5968467827919506986_n.jpg',
    title: 'Quiet Moment Together',
    couple: 'Atish & Nisha',
    category: 'pre-wedding',
    categoryLabel: 'Couple Portrait',
    location: 'Panache Banquets, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_19_793257770_17989577598160466_7304003581042454405_n.webp',
    title: 'Around the Sacred Fire',
    couple: 'Saheba & Tabish',
    category: 'weddings',
    categoryLabel: 'Wedding Vows',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_21_503557245_1923295018490855_5272306872656985150_n.jpg',
    title: 'The Varmala Exchange',
    couple: 'Tushar & Sonali',
    category: 'weddings',
    categoryLabel: 'Varmala Moment',
    location: 'Hotel Maurya, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_22_757864320_1041945001799715_5947063027976476237_n.jpg',
    title: 'Bridal Jewellery & Details',
    couple: 'Sweta',
    category: 'portraits',
    categoryLabel: 'Bridal Portrait',
    location: 'Gargee Grand, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_23_502957865_3957270467848197_2129031075788105422_n.jpg',
    title: 'Shared Smile in the Hallway',
    couple: 'Nilesh & Sweta',
    category: 'candid',
    categoryLabel: 'Candid Moment',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_24_498599666_1243005870515197_2024063437010795817_n.jpg',
    title: 'Blessings from Parents & Elders',
    couple: 'Kunika & Tushar',
    category: 'candid',
    categoryLabel: 'Family Blessings',
    location: 'Raj Resort, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_25_503322143_1029695289299746_1990035905117804192_n.jpg',
    title: 'Sangeet Night Dance',
    couple: 'Anupam & Aishwarya',
    category: 'weddings',
    categoryLabel: 'Sangeet Night',
    location: 'Patna Sahib',
    aspect: 'portrait',
  },
  {
    file: 'imgi_26_496403019_1845021889403844_4956047802463426832_n.jpg',
    title: 'Timeless Silk Bridal Look',
    couple: 'Nisha',
    category: 'portraits',
    categoryLabel: 'Bridal Portrait',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_26_704914393_18418070725179421_6063320906880904922_n.webp',
    title: 'Walking to the Mandap',
    couple: 'Dr. Govind & Dr. Swati',
    category: 'weddings',
    categoryLabel: 'Bridal Entry',
    location: 'Hotel Mantra, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_27_628323685_18346461886235287_4431154153769162509_n.jpg',
    title: 'Grand Reception Celebration',
    couple: 'Prince & Sonali',
    category: 'weddings',
    categoryLabel: 'Reception',
    location: 'Amrapali Banquet, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_28_497968523_676077798551497_129632294117399551_n.jpg',
    title: 'Mehendi Hands & Bangles',
    couple: 'Sonali',
    category: 'portraits',
    categoryLabel: 'Mehendi Details',
    location: 'Hotel Maurya, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_29_501699517_719521917281133_758854445455965033_n.jpg',
    title: 'Laughing Together on Stage',
    couple: 'Seema & Sayan',
    category: 'candid',
    categoryLabel: 'Candid Joy',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_30_501211589_682716128066605_5351718664988482860_n.jpg',
    title: 'Evening Pre-Wedding Portrait',
    couple: 'Atish & Nisha',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    location: 'Bodh Gaya, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_30_704427170_17969958399160466_4603175030385960861_n.jpg',
    title: 'Emotional Kanyadaan Hug',
    couple: 'Kunika & Tushar',
    category: 'weddings',
    categoryLabel: 'Kanyadaan',
    location: 'Raj Resort, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_31_500086948_1345565776702667_4279447914599074089_n.jpg',
    title: 'Sunset by the River',
    couple: 'Nilesh & Sweta',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    location: 'Ganga Ghat, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_31_704558536_17969950212160466_5180294263165990764_n.jpg',
    title: 'Varmala Under the Lights',
    couple: 'Tushar & Sonali',
    category: 'weddings',
    categoryLabel: 'Varmala Ceremony',
    location: 'Hotel Maurya, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_32_503839569_4145223665721335_4500354557201588219_n.jpg',
    title: 'Classic Groom Portrait',
    couple: 'Tushar',
    category: 'portraits',
    categoryLabel: 'Groom Portrait',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_33_503030520_700680142824964_1183544834968873214_n.jpg',
    title: 'Rose Petal Blessing',
    couple: 'Anupam & Aishwarya',
    category: 'candid',
    categoryLabel: 'Ceremony Finale',
    location: 'Patna Sahib',
    aspect: 'portrait',
  },
  {
    file: 'imgi_33_622021504_18038150105746530_2459113938488280772_n.jpg',
    title: 'Getting Ready in the Mirror',
    couple: 'Aishwarya',
    category: 'portraits',
    categoryLabel: 'Bridal Portrait',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_33_670300610_17969259912160466_182576810940768217_n.jpg',
    title: 'Sacred Pheras Promises',
    couple: 'Prince & Sonali',
    category: 'weddings',
    categoryLabel: 'Pheras',
    location: 'Amrapali Banquet, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_34_503934532_1614805625875734_5094697023054740783_n.jpg',
    title: 'Happy Smiles After the Vows',
    couple: 'Seema & Sayan',
    category: 'candid',
    categoryLabel: 'Candid Moment',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_35_491421751_1058975846139229_779249667392645784_n.jpg',
    title: 'Traditional Bridal Close-Up',
    couple: 'Swati',
    category: 'portraits',
    categoryLabel: 'Bridal Close-Up',
    location: 'Hotel Mantra, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_37_624868998_18120768787562443_7707868480967000786_n.jpg',
    title: 'Emotional Vidaai Hug',
    couple: 'Kunika & Family',
    category: 'candid',
    categoryLabel: 'Vidaai Moment',
    location: 'Raj Resort, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_38_655118742_18040353143551134_8014865019629092795_n.webp',
    title: 'Sparklers & New Beginnings',
    couple: 'Atish & Nisha',
    category: 'weddings',
    categoryLabel: 'Grand Exit',
    location: 'Panache Banquets, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_39_499633765_4203398276650190_3155938960120006605_n.jpg',
    title: 'Outdoor Couple Walk',
    couple: 'Nilesh & Sweta',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    location: 'Rajgir Hills, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'imgi_39_652002228_18104514550888609_3732499084195679568_n.jpg',
    title: 'Royal Couple Portrait',
    couple: 'Tushar & Sonali',
    category: 'portraits',
    categoryLabel: 'Couple Portrait',
    location: 'Hotel Maurya, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_43_611344093_17949077742160466_1107492647243003038_n.jpg',
    title: 'Under the Wedding Canopy',
    couple: 'Anupam & Aishwarya',
    category: 'weddings',
    categoryLabel: 'Mandap Ceremony',
    location: 'Patna Sahib',
    aspect: 'portrait',
  },
  {
    file: 'imgi_43_655431071_18158067241437459_47542197678496787_n.jpg',
    title: 'Dancing Under the Chandeliers',
    couple: 'Dr. Govind & Dr. Swati',
    category: 'weddings',
    categoryLabel: 'Sangeet Night',
    location: 'Hotel Mantra, Patna',
    aspect: 'portrait',
  },
  {
    file: 'imgi_63_503960164_1072908344727607_2131394423274308352_n.jpg',
    title: 'Warm Golden Portrait',
    couple: 'Prince & Sonali',
    category: 'portraits',
    categoryLabel: 'Couple Portrait',
    location: 'Patna, Bihar',
    aspect: 'portrait',
  },
  {
    file: 'LandingPage1.jpg',
    title: 'The Grand Mandap Celebration',
    couple: 'Kunika & Tushar',
    category: 'weddings',
    categoryLabel: 'Wedding Highlight',
    location: 'Raj Resort, Patna',
    aspect: 'landscape',
  },
  {
    file: 'Landingpage2.jpg',
    title: 'Evening by the Riverfront',
    couple: 'Nilesh & Sweta',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    location: 'Ganga Ghat, Patna',
    aspect: 'landscape',
  },
  {
    file: 'LandingPage3.png',
    title: 'Classic Bridal Portrait',
    couple: 'Sweta',
    category: 'portraits',
    categoryLabel: 'Bridal Portrait',
    location: 'Gargee Grand, Patna',
    aspect: 'landscape',
  },
];

const LENSES = ['50mm Prime Lens', '85mm Portrait Lens', '35mm Wide Prime', '24-70mm Zoom Lens'];
const CAMERAS = ['Sony Alpha Cinema', 'Sony Full-Frame Camera', 'Sony Alpha Portrait', 'Sony FX3 Cinema'];
const SETTINGS = [
  'Natural Light',
  'Warm Evening Light',
  'Soft Indoor Light',
  'Golden Hour',
];

export const GALLERY_PHOTOS: PhotoFrame[] = RAW_GALLERY_FILES.map((item, idx) => ({
  id: `gal-${idx + 1}`,
  title: item.title,
  scriptHighlight: item.categoryLabel.toLowerCase(),
  category: item.category,
  categoryLabel: item.categoryLabel,
  couple: item.couple,
  location: item.location,
  year: idx % 3 === 0 ? '2025' : '2024',
  imageUrl: `/Gallary/${item.file}`,
  aspect: item.aspect,
  description: `${item.title} — captured naturally at ${item.location} with a focus on real feelings and family warmth.`,
  emotionalExcerpt: 'Real moments held in warm, natural light.',
  exif: {
    lens: LENSES[idx % LENSES.length],
    camera: CAMERAS[idx % CAMERAS.length],
    setting: SETTINGS[idx % SETTINGS.length],
  },
}));

// ============================================================================
// ALL 31 UPLOADED SIGNATURE FRAMES FROM .assets/SignaruteImage
// ============================================================================
const RAW_SIGNATURE_FILES = [
  'imgi_10_620266125_17907545478161915_4102420289312451089_n.jpg',
  'imgi_12_503579484_1821987428343796_4517332579793077509_n.jpg',
  'imgi_13_626429047_18039453911743433_5545539555574162708_n.jpg',
  'imgi_14_503307046_724411746910164_4732820193365241494_n.jpg',
  'imgi_14_793840504_17989682433160466_6763089032284955801_n.jpg',
  'imgi_15_791706668_17989657194160466_1288569572505249799_n.jpg',
  'imgi_18_792764378_17989579062160466_1738659390025263240_n.jpg',
  'imgi_20_622289146_17972843666834908_8509481171627861222_n.jpg',
  'imgi_20_793902640_18625914019009933_3844893497203068358_n.jpg',
  'imgi_21_791045423_18625532263009933_1127683184340303703_n.jpg',
  'imgi_22_503266730_1197470905038514_5279802532237619812_n.jpg',
  'imgi_23_629689692_18395308570199373_6463516980763330862_n.jpg',
  'imgi_23_712643826_17972376771160466_3971202427154637297_n.jpg',
  'imgi_24_710468089_17972373231160466_6423309497429095746_n.jpg',
  'imgi_25_641238328_18563802418046015_7626816009777784522_n.jpg',
  'imgi_32_702695987_17969751702160466_2951487923943233506_n.jpg',
  'imgi_35_648245666_17957908989160466_1465758617195676549_n.jpg',
  'imgi_35_669741192_18081443231096974_4137129828872593350_n.jpg',
  'imgi_36_501125801_681277734522456_4378246715435403906_n.jpg',
  'imgi_36_674549225_17969260383160466_9061567547278234688_n.jpg',
  'imgi_39_615023029_17949440985160466_7521068306993776435_n.jpg',
  'imgi_40_503288023_1765393297668372_3472115296296959975_n.jpg',
  'imgi_40_613087823_17949293922160466_8241948158425466193_n.jpg',
  'imgi_40_653406047_18099443923751734_1855867616202251122_n.jpg',
  'imgi_41_502026961_1342264066878222_5527551591763120014_n.jpg',
  'imgi_41_615236824_17949183573160466_1779332980666144285_n.jpg',
  'imgi_42_613629008_17949141993160466_8215764709536559950_n.webp',
  'imgi_48_792909935_17989635174160466_3286981417954613676_n.jpg',
  'imgi_49_793901141_17989635192160466_1011388870616303356_n.jpg',
  'imgi_9_621552755_17956505118026578_7412093389766368195_n.jpg',
  'imgi_9_825324190_18634205986009933_6617488119082731688_n.jpg',
];

const SIGNATURE_TITLES = [
  'The Sindoor Blessing',
  'Evening Mandap Glow',
  'Bridal Alta & Payal',
  'Royal Couple Silhouette',
  'Around the Sacred Fire',
  'Bridal Veil in Warm Light',
  'Haldi Morning Smile',
  'Ganga Ghat Sunrise',
  'Bridal Jewellery Detail',
  'A Father’s Proud Tear',
  'Varmala Garland Moment',
  'Walking Together',
  'Mehendi Hands & Laughter',
  'Grand Reception Entry',
  'Sangeet Dance Twirl',
  'Sweet Wedding Vows',
  'Bridal Lehenga Detail',
  'Mother’s Warm Blessing',
  'The Groom’s Turban',
  'Shower of Rose Petals',
  'Under the Chandeliers',
  'Sacred Wedding Thread',
  'Emotional Vidaai Hug',
  'Forever Together',
  'Golden Hour Smile',
  'Classic Red Bridal Look',
  'Wedding Rituals',
  'Quiet Bridal Portrait',
  'Family Blessings',
  'Royal Archway Portrait',
  'Natural Grace',
];

const COUPLES_LIST = [
  'Kunika & Tushar',
  'Tushar & Sonali',
  'Nilesh & Sweta',
  'Anupam & Aishwarya',
  'Atish & Nisha',
  'Prince & Sonali',
  'Seema & Sayan',
  'Dr. Govind & Dr. Swati',
];

export const SIGNATURE_FRAMES: PhotoFrame[] = RAW_SIGNATURE_FILES.map((file, idx) => {
  const categories: ('weddings' | 'pre-wedding' | 'portraits' | 'candid')[] = [
    'weddings',
    'portraits',
    'candid',
    'pre-wedding',
  ];
  const catLabels = [
    'Signature Photo',
    'Bridal Portrait',
    'Candid Moment',
    'Couple Portrait',
  ];
  return {
    id: `sig-${idx + 1}`,
    title: SIGNATURE_TITLES[idx] || `Signature Photo ${idx + 1}`,
    scriptHighlight: 'signature photo',
    category: categories[idx % 4],
    categoryLabel: catLabels[idx % 4],
    couple: COUPLES_LIST[idx % COUPLES_LIST.length],
    location: 'Patna, Bihar',
    year: idx % 2 === 0 ? '2025' : '2024',
    imageUrl: `/SignatureImage/${file}`,
    aspect: 'portrait',
    description: `Captured by Masoom Studio in Patna — focusing on natural expressions, vibrant colours, and real family feelings.`,
    emotionalExcerpt: 'A memory built to stay with your family for generations.',
    exif: {
      lens: LENSES[idx % LENSES.length],
      camera: CAMERAS[idx % CAMERAS.length],
      setting: SETTINGS[idx % SETTINGS.length],
    },
  };
});

// ============================================================================
// SERVICES & PACKAGES (Aligned with 09-RESEARCH-AND-REFERENCES.md in simple human language)
// ============================================================================
export const COMMISSION_SERVICES: CommissionService[] = [
  {
    id: 'c1',
    number: '01',
    title: 'Wedding Films & Candid Photography',
    scriptHighlight: 'full wedding story',
    tagline: 'Vibrant, fun and natural coverage for your entire wedding celebration',
    description:
      'Our most loved package for full weddings across Patna, Bihar, and destination venues. Masoom Javed and our team cover every event — from Roka, Engagement, Haldi, Mehendi, and Sangeet to the Wedding rituals and Reception — capturing both candid emotions and traditional family moments.',
    deliverables: [
      'Cinematic Wedding Teaser / Highlight Reel & Full Wedding Film',
      'Candid Photography focused on real smiles, hugs, and natural moments',
      'Traditional Photography & Videography for all family rituals and guests',
      'Full coverage for Engagement, Haldi, Mehendi, Sangeet, Wedding & Reception',
      'High-Resolution Edited Photos shared on a private online family gallery',
    ],
    humanNote:
      'We blend in like family so you can enjoy your wedding without stiff or forced poses.',
    dayLabel: 'FULL COVERAGE · ALL EVENTS',
    phaseTitle: 'Every Ritual & Real Emotion',
  },
  {
    id: 'c2',
    number: '02',
    title: 'Pre-Wedding Shoots & Couple Films',
    scriptHighlight: 'your love story',
    tagline: 'Relaxed outdoor and location shoots before the wedding madness begins',
    description:
      'A fun, easygoing shoot designed around the two of you. Whether at Ganga Ghat at sunrise, Rajgir hills, Bodh Gaya resorts, or your favourite spot in Patna, we help you feel comfortable in front of the camera so your photos and short film look natural and full of life.',
    deliverables: [
      '2–3 Minute Cinematic Pre-Wedding Couple Film & Save-the-Date Teaser',
      'Beautifully edited Candid & Portrait Photos of the couple',
      'Help with choosing the best locations, outfits, and timing',
      'Ready-to-play video for your Sangeet or Reception big screen',
    ],
    humanNote:
      'No awkward posing — just simple walks, real conversations, and natural laughter.',
    dayLabel: 'COUPLE SESSION · OUTDOOR & STUDIO',
    phaseTitle: 'Fun, Natural & Relaxed',
  },
  {
    id: 'c3',
    number: '03',
    title: 'Drone Coverage & Destination Weddings',
    scriptHighlight: 'grand views',
    tagline: 'Aerial drone shots, multi-camera setups, and travel crew across India',
    description:
      'For grand lawn weddings, baraat processions, and destination celebrations outside Patna. Our team travels with full backup equipment and aerial drones (where venue permissions allow) to capture the grand scale of your venue alongside intimate family rituals.',
    deliverables: [
      'Aerial Drone Videography & Photography for Baraat, Venue & Varmala',
      'Senior Team of Candid Photographers, Cinematographers & Traditional Cameramen',
      'Clear audio recording of wedding vows, family speeches, and ceremony music',
      'Safe multi-drive backup of all your wedding photos and videos every night',
    ],
    humanNote:
      'Whether in Patna, Bodh Gaya, Rajgir, or anywhere in India, our team travels to you.',
    dayLabel: 'AERIAL & DESTINATION · PAN-INDIA',
    phaseTitle: 'Grand Scale & Safe Backups',
  },
  {
    id: 'c4',
    number: '04',
    title: 'Custom Wedding Albums & Photo Books',
    scriptHighlight: 'printed memories',
    tagline: 'Handcrafted wedding albums designed to stay in your family for generations',
    description:
      'Phones and computers change over the years, but a printed family album stays forever. We design clean, timeless wedding albums with thick, long-lasting pages and protective covers so your parents, family, and future generations can relive your wedding day anytime.',
    deliverables: [
      'Custom Album Layout personally reviewed with your favourite photos',
      'Premium Non-Tearable Matte, Silk, or Velvet Finish Pages',
      'Matching Presentation Box & Optional Mini Albums for Both Parents',
      'Custom packages tailored to your exact events, dates, and family requirements',
    ],
    humanNote:
      'Sit with us at our Bailey Road studio in Patna to touch and feel our sample albums.',
    dayLabel: 'FAMILY KEEPSAKE · PRINTED ALBUMS',
    phaseTitle: 'Memories You Can Hold',
  },
];

export const VENUE_INSTALLATIONS: VenueInstallation[] = [
  {
    id: 'v1',
    title: 'Grand Ballroom & Royal Varmala',
    venue: 'Hotel Maurya',
    location: 'South Gandhi Maidan, Patna',
    atmosphereTag: 'Warm Chandeliers & Classic Elegance',
    summary:
      'One of Patna’s most loved wedding venues. We use soft, warm lighting that keeps the golden glow of the chandeliers looking natural while making sure every face in your family photos looks bright and clear.',
    lightingNotes:
      'Soft portrait lighting that flatters skin tones without harsh camera flashes.',
    acousticNotes:
      'Clear audio recording of your wedding vows and family blessings.',
    imageUrl: '/Gallary/imgi_31_704558536_17969950212160466_5180294263165990764_n.jpg',
    secondaryImageUrl: '/SignatureImage/imgi_10_620266125_17907545478161915_4102420289312451089_n.jpg',
    dateSeason: 'Patna Wedding Season',
  },
  {
    id: 'v2',
    title: 'Morning Mist & Riverfront Portraits',
    venue: 'Ganga Ghat Steps',
    location: 'Patna Riverfront, Bihar',
    atmosphereTag: 'Sunrise Light & Earthen Diyas',
    summary:
      'Shooting by the steps of the Ganga at sunrise gives a peaceful, timeless feel you cannot find anywhere else. As the morning sun rises over the water, couple portraits look naturally magical.',
    lightingNotes:
      'Natural sunrise light paired with warm diyas during early morning shoots.',
    acousticNotes:
      'Peaceful morning river breeze and temple bells.',
    imageUrl: '/Gallary/Landingpage2.jpg',
    secondaryImageUrl: '/SignatureImage/imgi_20_622289146_17972843666834908_8509481171627861222_n.jpg',
    dateSeason: 'Morning Pre-Wedding Shoots',
  },
  {
    id: 'v3',
    title: 'Open-Air Lawns & Marigold Mandaps',
    venue: 'Raj Resort & Bailey Road Lawns',
    location: 'Bailey Road, Patna',
    atmosphereTag: 'Open Sky, Fairy Lights & Sparklers',
    summary:
      'Spacious open lawns are wonderful for grand baraat entries, flower-filled varmala stages, and midnight pheras under fairy lights and marigolds.',
    lightingNotes:
      'Balanced night lighting so both the couple and the twinkling background lights look beautiful.',
    acousticNotes:
      'Dedicated microphones near the mandap to capture the ceremony clearly.',
    imageUrl: '/Gallary/LandingPage1.jpg',
    secondaryImageUrl: '/Gallary/imgi_11_663089682_18088892522215915_6152286074647645901_n.jpg',
    dateSeason: 'Open-Lawn Celebrations',
  },
  {
    id: 'v4',
    title: 'Vibrant Sangeet & Ring Ceremonies',
    venue: 'The Panache Banquets',
    location: 'West Gandhi Maidan, Patna',
    atmosphereTag: 'Dance Floor Energy & Family Fun',
    summary:
      'Perfect for high-energy Sangeet nights and engagement parties. Our team moves right alongside your family on the dance floor to capture every laugh, twirl, and cheer.',
    lightingNotes:
      'Clean stage and dance-floor lighting for sharp, colourful action photos.',
    acousticNotes:
      'Great music mix combined with real cheers and applause from your family.',
    imageUrl: '/Gallary/imgi_19_625845774_18098232941506507_5968467827919506986_n.jpg',
    secondaryImageUrl: '/SignatureImage/imgi_23_712643826_17972376771160466_3971202427154637297_n.jpg',
    dateSeason: 'Engagement & Sangeet Nights',
  },
  {
    id: 'v5',
    title: 'Bridal Getting-Ready & Indoor Rituals',
    venue: 'Gargee Grand',
    location: 'Exhibition Road, Patna',
    atmosphereTag: 'Warm Rooms & Grand Staircases',
    summary:
      'Wonderful for calm bridal portraits before the ceremony and emotional indoor family rituals. The warm wooden interiors and staircases make every portrait look rich and classic.',
    lightingNotes:
      'Soft window light and warm indoor lamps for natural bridal portraits.',
    acousticNotes:
      'Sweet moments of mothers and sisters helping the bride get ready.',
    imageUrl: '/Gallary/LandingPage3.png',
    secondaryImageUrl: '/SignatureImage/imgi_32_702695987_17969751702160466_2951487923943233506_n.jpg',
    dateSeason: 'Indoor Luxury Weddings',
  },
  {
    id: 'v6',
    title: 'Family Gatherings & Emotional Vidaai',
    venue: 'Amrapali Banquet & Lawns',
    location: 'Bailey Road, Patna',
    atmosphereTag: 'Warm Family Celebrations',
    summary:
      'Located right on Bailey Road near our studio, Amrapali hosts warm, close-knit family weddings where three generations celebrate together under one roof.',
    lightingNotes:
      'Gentle lighting that lets us capture candid moments without disturbing elders.',
    acousticNotes:
      'Traditional wedding songs and heartfelt blessings from grandparents.',
    imageUrl: '/Gallary/imgi_27_628323685_18346461886235287_4431154153769162509_n.jpg',
    secondaryImageUrl: '/Gallary/imgi_37_624868998_18120768787562443_7707868480967000786_n.jpg',
    dateSeason: 'All-Season Weddings',
  },
];

// ============================================================================
// MAP LOCATIONS AROUND BIHAR & INDIA (With exact Google Map coordinates & queries)
// ============================================================================
export const MAP_LOCATIONS: MapLocationPin[] = [
  {
    id: 'm1',
    city: 'Bailey Road, Patna (Studio HQ)',
    venue: 'Masoom Studio · Pillar No. 42, Pandey Palace',
    state: 'Patna, Bihar 800014',
    couple: 'Masoom Javed & Studio Team',
    year: 'Est. 2018',
    xPercent: 48,
    yPercent: 46,
    lat: '25.6063075',
    lng: '85.0820087',
    mapQuery: '25.6063075,85.0820087 (Masoom Studio, Pillar No. 42, Pandey Palace, Bailey Road, Patna)',
    zoom: 17,
    description:
      'Our studio at Pillar No. 42, Pandey Palace, Plot 2, Bailey Road, near Paras Hospital, Patna 800014. Come visit us for a friendly chat over tea and see our wedding films & albums.',
    imageUrl: '/Gallary/LandingPage1.jpg',
    filmId: 'f-reel-1',
  },
  {
    id: 'm2',
    city: 'South Gandhi Maidan',
    venue: 'Hotel Maurya, Patna',
    state: 'Patna, Bihar',
    couple: 'Tushar & Sonali',
    year: '2025',
    xPercent: 58,
    yPercent: 38,
    lat: '25.6185',
    lng: '85.1414',
    mapQuery: 'Hotel Maurya, South Gandhi Maidan, Patna, Bihar',
    zoom: 16,
    description:
      'Grand varmala and midnight wedding rituals filmed under the chandeliers of Hotel Maurya.',
    imageUrl: '/Gallary/imgi_31_704558536_17969950212160466_5180294263165990764_n.jpg',
    filmId: 'f-reel-4',
  },
  {
    id: 'm3',
    city: 'Patna Riverfront',
    venue: 'Ganga Ghat Steps',
    state: 'Patna Sahib, Bihar',
    couple: 'Nilesh & Sweta',
    year: '2025',
    xPercent: 68,
    yPercent: 32,
    lat: '25.6207',
    lng: '85.1740',
    mapQuery: 'Gandhi Ghat, Patna, Bihar',
    zoom: 15,
    description:
      'Peaceful sunrise couple portraits and natural pre-wedding shoots along the historic ghats of Patna.',
    imageUrl: '/Gallary/Landingpage2.jpg',
    filmId: 'f-reel-5',
  },
  {
    id: 'm4',
    city: 'Exhibition Road',
    venue: 'Gargee Grand & The Panache',
    state: 'Central Patna, Bihar',
    couple: 'Atish & Nisha',
    year: '2025',
    xPercent: 53,
    yPercent: 55,
    lat: '25.6110',
    lng: '85.1445',
    mapQuery: 'Gargee Grand, Exhibition Road, Patna, Bihar',
    zoom: 16,
    description:
      'Bridal portraits, joyful Sangeet dance nights, and full family wedding coverage in the heart of Patna.',
    imageUrl: '/Gallary/imgi_19_625845774_18098232941506507_5968467827919506986_n.jpg',
    filmId: 'f-reel-3',
  },
  {
    id: 'm5',
    city: 'West Bailey Road & Danapur',
    venue: 'Raj Resort & Amrapali Lawns',
    state: 'Patna, Bihar',
    couple: 'Kunika & Tushar',
    year: '2025',
    xPercent: 36,
    yPercent: 50,
    lat: '25.6095',
    lng: '85.0520',
    mapQuery: 'Bailey Road, Danapur, Patna, Bihar',
    zoom: 15,
    description:
      'Open-lawn marigold mandaps, emotional Kanyadaan moments, and sparkler celebrations.',
    imageUrl: '/Gallary/imgi_11_663089682_18088892522215915_6152286074647645901_n.jpg',
    filmId: 'f-reel-6',
  },
  {
    id: 'm6',
    city: 'Bodh Gaya',
    venue: 'Heritage Resorts & Lawns',
    state: 'Gaya, Bihar',
    couple: 'Anupam & Aishwarya',
    year: '2025',
    xPercent: 44,
    yPercent: 74,
    lat: '24.6961',
    lng: '84.9870',
    mapQuery: 'Bodh Gaya, Bihar',
    zoom: 14,
    description:
      'Multi-day destination weddings filmed amidst peaceful lawns and candlelit courtyards in Bodh Gaya.',
    imageUrl: '/Gallary/imgi_16_792820577_17989635195160466_3434238158816086773_n.jpg',
    filmId: 'f-reel-2',
  },
  {
    id: 'm7',
    city: 'Rajgir Hills',
    venue: 'Rajgir Valley & Resorts',
    state: 'Nalanda, Bihar',
    couple: 'Prince & Sonali',
    year: '2024',
    xPercent: 65,
    yPercent: 66,
    lat: '25.0258',
    lng: '85.4200',
    mapQuery: 'Rajgir, Bihar',
    zoom: 14,
    description:
      'Scenic pre-wedding films and outdoor couple shoots surrounded by the hills of Rajgir.',
    imageUrl: '/Gallary/imgi_27_628323685_18346461886235287_4431154153769162509_n.jpg',
    filmId: 'f-reel-6',
  },
  {
    id: 'm8',
    city: 'Across India',
    venue: 'Varanasi, Kolkata, Jaipur & Beyond',
    state: 'Destination Weddings',
    couple: 'Seema & Sayan',
    year: '2025',
    xPercent: 25,
    yPercent: 34,
    lat: '25.3176',
    lng: '82.9739',
    mapQuery: 'Varanasi, Uttar Pradesh',
    zoom: 13,
    description:
      'Our team travels across Bihar and all over India to film destination weddings and pre-wedding stories.',
    imageUrl: '/Gallary/LandingPage3.png',
    filmId: 'f-reel-1',
  },
];

export const GRATITUDE_NOTES: GratitudeNote[] = [
  {
    id: 'g1',
    quote:
      'Thank you so much for our wedding film! Tushar and I spent the whole evening laughing, crying, and reliving every single ritual. You captured our parents’ warmth and the fun moments with our cousins so naturally. It is the best memory our families have.',
    author: 'Kunika & Tushar',
    role: 'Raj Resort, Patna',
    location: 'Patna, Bihar',
    imageUrl: '/SignatureImage/imgi_24_710468089_17972373231160466_6423309497429095746_n.jpg',
  },
  {
    id: 'g2',
    quote:
      'We never felt like a camera was blocking our rituals or forcing us into fake poses. Masoom Javed and his team moved like family members — friendly, patient, and always in the right place at the right time.',
    author: 'Tushar & Sonali',
    role: 'Hotel Maurya, Patna',
    location: 'Patna, Bihar',
    imageUrl: '/SignatureImage/imgi_23_712643826_17972376771160466_3971202427154637297_n.jpg',
  },
  {
    id: 'g3',
    quote:
      'From our early morning pre-wedding shoot at Ganga Ghat to the emotional Vidaai hug, every photo feels real and full of life. When our grandmother opened the wedding album, she had tears of happiness in her eyes.',
    author: 'Nilesh & Sweta',
    role: 'Gargee Grand, Patna',
    location: 'Patna, Bihar',
    imageUrl: '/Gallary/imgi_15_655763221_18131362612557368_1871368625891049134_n.jpg',
  },
  {
    id: 'g4',
    quote:
      'Seeing our wedding teaser and full film left both our families speechless. The way you mixed the real sounds of our wedding vows with the music gives us goosebumps every time we watch it.',
    author: 'Anupam & Aishwarya',
    role: 'Patna Sahib, Bihar',
    location: 'Patna, Bihar',
    imageUrl: '/Gallary/imgi_16_792820577_17989635195160466_3434238158816086773_n.jpg',
  },
  {
    id: 'g5',
    quote:
      'What wonderful memories of the best week of our lives! Huge thanks to Masoom Studio for making us feel so comfortable during our couple portraits and capturing all the fun and madness of our Sangeet night.',
    author: 'Atish & Nisha',
    role: 'Panache Banquets, Patna',
    location: 'Patna, Bihar',
    imageUrl: '/Gallary/imgi_19_625845774_18098232941506507_5968467827919506986_n.jpg',
  },
];

export const STORY_SCENES: StoryScene[] = [
  {
    sceneNumber: 'CHAPTER 01',
    year: '2018',
    title: 'How We Started in Patna',
    scriptTitle: 'A love for real moments',
    headline: 'Choosing natural smiles over stiff, staged wedding poses',
    narrative:
      'Masoom Studio was founded with a simple belief: wedding photos and films should feel real, vibrant, and full of life. Instead of asking couples to hold stiff poses under bright lights, Masoom Javed focused on capturing genuine laughter, family hugs, and the natural beauty of Indian wedding traditions.',
    highlightStat: 'Est. 2018 · Patna, Bihar',
    imageUrl: '/Gallary/LandingPage1.jpg',
    secondaryImageUrl: '/Gallary/imgi_11_663089682_18088892522215915_6152286074647645901_n.jpg',
  },
  {
    sceneNumber: 'CHAPTER 02',
    year: '2019–2020',
    title: 'Growing Through Word of Mouth',
    scriptTitle: 'Trusted by families across Bihar',
    headline: 'Building a friendly team of photographers, filmmakers, and editors',
    narrative:
      'As couples shared their wedding films and photos with friends and relatives, our studio grew naturally across Patna and Bihar. We brought together a dedicated team covering candid photography, traditional videography, wedding teasers, and custom family albums.',
    highlightStat: 'Candid & Traditional Coverage',
    imageUrl: '/Gallary/imgi_13_657521665_18125284714601336_3167577979393449239_n.jpg',
    secondaryImageUrl: '/SignatureImage/imgi_14_793840504_17989682433160466_6763089032284955801_n.jpg',
  },
  {
    sceneNumber: 'CHAPTER 03',
    year: '2021–2022',
    title: 'Pre-Wedding Stories & Drone Views',
    scriptTitle: 'From Ganga Ghat to Rajgir hills',
    headline: 'Adding outdoor pre-wedding films and aerial drone coverage',
    narrative:
      'We expanded our work to include scenic pre-wedding shoots and aerial drone coverage — filming couples at sunrise by the Ganga, in the hills of Rajgir, and across grand wedding lawns in Patna and Bodh Gaya.',
    highlightStat: 'Pre-Wedding & Drone Shoots',
    imageUrl: '/Gallary/Landingpage2.jpg',
    secondaryImageUrl: '/Gallary/imgi_16_792820577_17989635195160466_3434238158816086773_n.jpg',
  },
  {
    sceneNumber: 'CHAPTER 04',
    year: '2023',
    title: 'Handcrafted Family Albums',
    scriptTitle: 'Memories you can hold in your hands',
    headline: 'Designing long-lasting wedding photo books for couples and parents',
    narrative:
      'We know how much parents and grandparents love flipping through a real wedding album. Every album we design is carefully laid out to tell your whole wedding story from the first Haldi smile to the final Vidaai hug.',
    highlightStat: 'Custom Family Albums',
    imageUrl: '/Gallary/LandingPage3.png',
    secondaryImageUrl: '/SignatureImage/imgi_20_793902640_18625914019009933_3844893497203068358_n.jpg',
  },
  {
    sceneNumber: 'CHAPTER 05',
    year: '2024',
    title: 'Our Bailey Road Studio',
    scriptTitle: 'A welcoming space for families',
    headline: 'Visit us at Pillar No. 42, Pandey Palace, Bailey Road, near Paras Hospital',
    narrative:
      'At our Bailey Road studio in Patna, couples and their families can sit comfortably, watch full wedding films, look through printed albums, and plan their wedding coverage with us in person.',
    highlightStat: 'Pillar No. 42, Bailey Road, Patna',
    imageUrl: '/Gallary/imgi_31_704558536_17969950212160466_5180294263165990764_n.jpg',
    secondaryImageUrl: '/Gallary/imgi_27_628323685_18346461886235287_4431154153769162509_n.jpg',
  },
  {
    sceneNumber: 'CHAPTER 06',
    year: 'Today',
    title: 'Vibrant, Fun & Natural',
    scriptTitle: 'Your story, told with heart',
    headline: 'Giving personal care and attention to every wedding we shoot',
    narrative:
      'Whether it is an intimate Roka at home or a grand multi-day wedding celebration, Masoom Javed and our team treat your wedding like our own family event — making sure not a single special moment is missed.',
    highlightStat: 'Booking Upcoming Wedding Dates',
    imageUrl: '/Gallary/imgi_37_624868998_18120768787562443_7707868480967000786_n.jpg',
    secondaryImageUrl: '/Gallary/imgi_15_655763221_18131362612557368_1871368625891049134_n.jpg',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq1',
    category: 'General',
    question: 'Where is Masoom Studio located in Patna?',
    answer:
      'Our studio is located around Pillar No. 42, Pandey Palace, Plot 2, Bailey Road, near Paras Hospital, Patna, Bihar 800014. You and your family are always welcome to visit us to see our films and albums in person.',
  },
  {
    id: 'faq2',
    category: 'Services & Packages',
    question: 'What services do you offer for weddings?',
    answer:
      'We provide complete wedding coverage including Candid Photography, Traditional Videography & Photography, Cinematic Wedding Films & Teasers, Pre-Wedding Shoots & Films, Drone Photography, and Custom Wedding Albums for Engagement, Roka, Haldi, Mehendi, Sangeet, Wedding, and Reception.',
  },
  {
    id: 'faq3',
    category: 'Booking & Travel',
    question: 'Do you travel outside Patna for weddings and pre-wedding shoots?',
    answer:
      'Yes! Along with Patna, our team travels across Bihar (including Bodh Gaya, Rajgir, Muzaffarpur, Darbhanga, and Bhagalpur) and all over India for destination weddings and pre-wedding shoots.',
  },
  {
    id: 'faq4',
    category: 'Films & Photos',
    question: 'How would you describe your photography and filmmaking style?',
    answer:
      'Our style is vibrant, fun, and natural. We focus on capturing real moments — genuine laughter, family blessings, emotional rituals, and happy dances — while also making sure all traditional family photos are covered properly.',
  },
  {
    id: 'faq5',
    category: 'Services & Packages',
    question: 'Can we customize our wedding package according to our events?',
    answer:
      'Yes, every wedding is different. Whether you need coverage for a single-day engagement or a full 3–4 day wedding celebration with both bride and groom side teams, we create a custom package and quote tailored to your dates and events.',
  },
  {
    id: 'faq6',
    category: 'Films & Photos',
    question: 'When and how do we receive our photos, videos, and album?',
    answer:
      'We share your edited high-resolution photos, wedding teaser, and full film online and on a drive, and we print your custom wedding album after you select your favourite photos. Exact delivery timelines and terms are shared clearly when you book.',
  },
  {
    id: 'faq7',
    category: 'Booking & Travel',
    question: 'How can we check availability and book our dates?',
    answer:
      'Simply click the Enquire button, send us a message on WhatsApp, or call us directly with your wedding dates and venue details. We recommend booking early for popular wedding dates.',
  },
];
