import type { Species, Taxon } from '../types/species.types';

/**
 * Mock taxonomy copied from the Figma Ensiklopedia frames. Only the designed
 * branch (Animalia › Arthropoda › Insecta › Lepidoptera › Nymphalidae › Danaus)
 * has children; other nodes show an empty state until real data exists.
 */
export const MOCK_TAXA: Taxon[] = [
  // Kingdoms
  { id: 'animalia', name: 'Animalia', rank: 'kingdom', parentId: null },
  { id: 'plantae', name: 'Plantae', rank: 'kingdom', parentId: null },
  { id: 'fungi', name: 'Fungi', rank: 'kingdom', parentId: null },
  { id: 'protista', name: 'Protista', rank: 'kingdom', parentId: null },
  { id: 'monera', name: 'Monera', rank: 'kingdom', parentId: null },

  // Phylum (single child: skipped straight to its classes, as in Figma)
  { id: 'arthropoda', name: 'Arthropoda', rank: 'phylum', parentId: 'animalia' },

  // Classes
  { id: 'insecta', name: 'Insecta', rank: 'class', parentId: 'arthropoda' },
  { id: 'crustacea', name: 'Crustacea', rank: 'class', parentId: 'arthropoda' },
  { id: 'myriapoda', name: 'Myriapoda', rank: 'class', parentId: 'arthropoda' },
  { id: 'arachnida', name: 'Arachnida', rank: 'class', parentId: 'arthropoda' },

  // Order
  { id: 'lepidoptera', name: 'Lepidoptera', rank: 'order', parentId: 'insecta' },

  // Families, grouped as on the Figma "Ordo Lepidoptera" screen
  { id: 'nymphalidae', name: 'Nymphalidae', rank: 'family', parentId: 'lepidoptera', group: 'Kupu-Kupu' },
  { id: 'papilionidae', name: 'Papilionidae', rank: 'family', parentId: 'lepidoptera', group: 'Kupu-Kupu' },
  { id: 'lycaenidae', name: 'Lycaenidae', rank: 'family', parentId: 'lepidoptera', group: 'Kupu-Kupu' },
  { id: 'pieridae', name: 'Pieridae', rank: 'family', parentId: 'lepidoptera', group: 'Kupu-Kupu' },
  { id: 'saturniidae', name: 'Saturniidae', rank: 'family', parentId: 'lepidoptera', group: 'Ngengat' },
  { id: 'sphingidae', name: 'Sphingidae', rank: 'family', parentId: 'lepidoptera', group: 'Ngengat' },
  { id: 'noctuidae', name: 'Noctuidae', rank: 'family', parentId: 'lepidoptera', group: 'Ngengat' },

  // Genera of Nymphalidae
  { id: 'danaus', name: 'Danaus', rank: 'genus', parentId: 'nymphalidae', image: require('./images/genus-danaus.jpg') },
  { id: 'morpho', name: 'Morpho', rank: 'genus', parentId: 'nymphalidae', image: require('./images/genus-morpho.jpg') },
  { id: 'kallima', name: 'Kallima', rank: 'genus', parentId: 'nymphalidae', image: require('./images/genus-kallima.jpg') },
  { id: 'vanessa', name: 'Vanessa', rank: 'genus', parentId: 'nymphalidae', image: require('./images/genus-vanessa.jpg') },
  { id: 'hypolimnas', name: 'Hypolimnas', rank: 'genus', parentId: 'nymphalidae', image: require('./images/genus-hypolimnas.jpg') },
  { id: 'heliconius', name: 'Heliconius', rank: 'genus', parentId: 'nymphalidae', image: require('./images/genus-heliconius.jpg') },
];

export const MOCK_SPECIES: Species[] = [
  {
    id: 'danaus-plexippus',
    scientificName: 'Danaus plexippus',
    commonName: 'Kupu-kupu Monarch',
    genusId: 'danaus',
    photo: require('./images/species-danaus-plexippus.jpg'),
    habitat: ['darat', 'hutan'],
    diet: ['herbivora'],
    traits: ['terbang'],
    conservationStatus: 'rentan',
  },
  {
    id: 'danaus-genutia',
    scientificName: 'Danaus genutia',
    commonName: 'Kupu-kupu Harimau Bergaris',
    genusId: 'danaus',
    photo: require('./images/species-danaus-genutia.jpg'),
    habitat: ['darat', 'hutan'],
    diet: ['herbivora'],
    traits: ['terbang'],
    conservationStatus: 'risiko-rendah',
  },
  {
    id: 'danaus-chrysippus',
    scientificName: 'Danaus chrysippus',
    commonName: 'Kupu-kupu Harimau Polos',
    genusId: 'danaus',
    photo: require('./images/species-danaus-chrysippus.jpg'),
    habitat: ['darat'],
    diet: ['herbivora'],
    traits: ['terbang'],
    conservationStatus: 'risiko-rendah',
  },
  {
    id: 'cacatua-sulphurea',
    scientificName: 'Cacatua sulphurea',
    commonName: 'Kakatua Jambul Kuning',
    genusId: null,
    photo: require('./images/species-cacatua.jpg'),
    habitat: ['hutan'],
    diet: ['herbivora'],
    traits: ['terbang'],
    conservationStatus: 'terancam',
  },
  {
    // Figma spells this "Pretopus sp."; the genus of fruit bats is Pteropus.
    id: 'pteropus-sp',
    scientificName: 'Pteropus sp.',
    commonName: 'Kalong',
    genusId: null,
    photo: require('./images/species-pteropus.jpg'),
    habitat: ['hutan'],
    diet: ['herbivora'],
    traits: ['terbang', 'nokturnal'],
    conservationStatus: 'rentan',
  },
  {
    id: 'padda-oryzata',
    scientificName: 'Padda oryzata',
    commonName: 'Gelatik Jawa',
    genusId: null,
    photo: require('./images/species-padda.jpg'),
    habitat: ['darat'],
    diet: ['herbivora'],
    traits: ['terbang'],
    conservationStatus: 'terancam',
  },
];
