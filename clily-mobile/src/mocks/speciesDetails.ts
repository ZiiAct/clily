import type { CommunityPhoto, Hotspot, IucnStatus, PopulationTrend } from '../types/species.types';
import type { ImageSource } from '../types/content.types';

/**
 * Mock detail data per species id. Danaus plexippus copies the Figma detail
 * frame; the others use short factual summaries in the same format.
 */

const DISTRIBUTION_MAP = require('./images/distribution-map.jpg');

/** Hotspots from the Figma "sebaran spesies 2" frame (map-box pixels). */
const FIGMA_HOTSPOTS: Hotspot[] = [
  { x: 25, y: 358, w: 98.36, h: 92 },
  { x: 145, y: 70, w: 163.58, h: 153 },
  { x: 201, y: 205, w: 64.15, h: 60 },
];

/** Community photos from the Figma "Frame 129" sheet. */
const FIGMA_COMMUNITY: CommunityPhoto[] = [
  { id: 'c1', photo: require('./images/community-1.jpg'), author: 'Vestia Zeta' },
  { id: 'c2', photo: require('./images/community-2.jpg'), author: 'Bambang Ajisatyo' },
  { id: 'c3', photo: require('./images/community-3.jpg'), author: 'Lee Min Ho' },
  { id: 'c4', photo: require('./images/community-4.jpg'), author: 'Kobokan Aeru' },
  { id: 'c5', photo: require('./images/community-5.jpg'), author: 'Deden Suparman' },
  { id: 'c6', photo: require('./images/community-6.jpg'), author: 'Kimberley' },
];

type DetailFields = {
  englishName: string;
  gallery?: ImageSource[];
  taxonomy: [string, string][];
  iucnStatus: IucnStatus;
  populationTrend: PopulationTrend;
  description: string;
  hotspots?: Hotspot[];
  communityPhotos?: CommunityPhoto[];
};

const LEPIDOPTERA: [string, string][] = [
  ['Kingdom', 'Animalia'],
  ['Filum', 'Arthropoda'],
  ['Sub-filum', 'Hexapoda'],
  ['Kelas', 'Insecta'],
  ['Ordo', 'Lepidoptera'],
  ['Famili', 'Nymphalidae'],
];

const MONARCH_GALLERY = [
  require('./images/species-danaus-plexippus-1.jpg'),
  require('./images/species-danaus-plexippus-2.jpg'),
  require('./images/species-danaus-plexippus-3.jpg'),
  require('./images/species-danaus-plexippus-4.jpg'),
];

export const MOCK_SPECIES_DETAILS: Record<string, DetailFields> = {
  'danaus-plexippus': {
    englishName: 'The Monarch',
    gallery: MONARCH_GALLERY,
    taxonomy: [...LEPIDOPTERA, ['Sub-famili', 'Danainae'], ['Genus', 'Danaus'], ['Spesies', 'Danaus plexippus']],
    iucnStatus: 'Vulnerable',
    populationTrend: 'Menurun',
    description:
      'saat ini terancam punah. Populasi kupu-kupu yang terkenal dengan migrasinya yang spektakuler ini telah mengalami penurunan drastis dalam beberapa dekade terakhir.',
    communityPhotos: MONARCH_GALLERY.map((photo, i) => ({ id: `m${i}`, photo, author: FIGMA_COMMUNITY[i].author })),
  },
  'danaus-genutia': {
    englishName: 'Common Tiger',
    taxonomy: [...LEPIDOPTERA, ['Sub-famili', 'Danainae'], ['Genus', 'Danaus'], ['Spesies', 'Danaus genutia']],
    iucnStatus: 'Least Concern',
    populationTrend: 'Stabil',
    description:
      'mudah dikenali dari sayap jingga dengan garis-garis hitam tebal. Spesies ini umum dijumpai di kebun dan tepi hutan di Asia Selatan dan Asia Tenggara.',
  },
  'danaus-chrysippus': {
    englishName: 'Plain Tiger',
    taxonomy: [...LEPIDOPTERA, ['Sub-famili', 'Danainae'], ['Genus', 'Danaus'], ['Spesies', 'Danaus chrysippus']],
    iucnStatus: 'Least Concern',
    populationTrend: 'Stabil',
    description:
      'tersebar luas di Afrika, Asia, dan Australia. Ulatnya memakan tanaman biduri sehingga kupu-kupu dewasa terasa pahit bagi pemangsa.',
  },
  'elymnias-hypermnestra': {
    englishName: 'Common Palmfly',
    gallery: [require('./images/species-elymnias.jpg')],
    taxonomy: [...LEPIDOPTERA, ['Sub-famili', 'Satyrinae'], ['Genus', 'Elymnias'], ['Spesies', 'Elymnias hypermnestra']],
    iucnStatus: 'Least Concern',
    populationTrend: 'Stabil',
    description:
      'sering terlihat di sekitar pohon palem dan kelapa, tempat ulatnya makan. Sayap bagian bawahnya cokelat bercorak sehingga mudah menyamar di antara daun kering.',
    communityPhotos: FIGMA_COMMUNITY,
  },
  'cacatua-sulphurea': {
    englishName: 'Yellow-crested Cockatoo',
    taxonomy: [
      ['Kingdom', 'Animalia'],
      ['Filum', 'Chordata'],
      ['Kelas', 'Aves'],
      ['Ordo', 'Psittaciformes'],
      ['Famili', 'Cacatuidae'],
      ['Genus', 'Cacatua'],
      ['Spesies', 'Cacatua sulphurea'],
    ],
    iucnStatus: 'Critically Endangered',
    populationTrend: 'Menurun',
    description:
      'adalah burung endemik Indonesia dan Timor Leste. Populasinya menurun tajam akibat perburuan untuk perdagangan burung peliharaan dan hilangnya hutan.',
  },
  'pteropus-sp': {
    englishName: 'Flying Fox',
    taxonomy: [
      ['Kingdom', 'Animalia'],
      ['Filum', 'Chordata'],
      ['Kelas', 'Mammalia'],
      ['Ordo', 'Chiroptera'],
      ['Famili', 'Pteropodidae'],
      ['Genus', 'Pteropus'],
    ],
    iucnStatus: 'Vulnerable',
    populationTrend: 'Menurun',
    description:
      'adalah kelelawar pemakan buah terbesar. Kalong berperan penting sebagai penyerbuk dan penyebar biji, namun terancam oleh perburuan dan hilangnya habitat.',
  },
  'padda-oryzata': {
    englishName: 'Java Sparrow',
    taxonomy: [
      ['Kingdom', 'Animalia'],
      ['Filum', 'Chordata'],
      ['Kelas', 'Aves'],
      ['Ordo', 'Passeriformes'],
      ['Famili', 'Estrildidae'],
      ['Genus', 'Padda'],
      ['Spesies', 'Padda oryzata'],
    ],
    iucnStatus: 'Endangered',
    populationTrend: 'Menurun',
    description:
      'adalah burung asli Jawa dan Bali yang dulu umum di sawah. Kini populasi liarnya sangat berkurang karena penangkapan untuk diperdagangkan.',
  },
};

export const MOCK_DISTRIBUTION = { map: DISTRIBUTION_MAP, hotspots: FIGMA_HOTSPOTS };
