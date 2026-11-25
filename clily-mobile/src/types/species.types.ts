import type { ImageSource } from './content.types';

export type TaxonRank = 'kingdom' | 'phylum' | 'class' | 'order' | 'family' | 'genus';

/** A node in the taxonomy tree (Kingdom → Filum → Kelas → Ordo → Famili → Genus). */
export type Taxon = {
  id: string;
  name: string;
  rank: TaxonRank;
  parentId: string | null;
  /** Optional sub-heading used to group siblings, e.g. "Kupu-Kupu" / "Ngengat" families */
  group?: string;
  image?: ImageSource;
};

export type HabitatFilter = 'darat' | 'laut' | 'air-tawar' | 'hutan';
export type DietFilter = 'herbivora' | 'karnivora' | 'omnivora';
export type TraitFilter = 'terbang' | 'nokturnal' | 'berbisa';
export type ConservationFilter = 'terancam' | 'rentan' | 'risiko-rendah';

/** Species entity from the PRD data model. */
export type Species = {
  id: string;
  scientificName: string;
  commonName: string;
  /** Null for species outside the mocked taxonomy branch */
  genusId: string | null;
  photo: ImageSource;
  habitat: HabitatFilter[];
  diet: DietFilter[];
  traits: TraitFilter[];
  conservationStatus: ConservationFilter;
};

export type SpeciesFilters = {
  habitat: HabitatFilter[];
  diet: DietFilter[];
  traits: TraitFilter[];
  status: ConservationFilter[];
};

export const EMPTY_FILTERS: SpeciesFilters = { habitat: [], diet: [], traits: [], status: [] };

/** IUCN Red List category, shown in English as in Figma ("Vulnerable"). */
export type IucnStatus = 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered';
export type PopulationTrend = 'Meningkat' | 'Stabil' | 'Menurun';

/** Sighting area on the distribution map, in map-box pixels (365 × 530 at 1× zoom). */
export type Hotspot = { x: number; y: number; w: number; h: number };

export type CommunityPhoto = { id: string; photo: ImageSource; author: string };

/** Everything the species detail and distribution screens need. */
export type SpeciesDetail = Species & {
  /** English common name shown in brackets under the title, e.g. "The Monarch" */
  englishName: string;
  /** Carousel photos; the first is the main photo */
  gallery: ImageSource[];
  /** Taxonomy rows in display order, e.g. ["Sub-filum", "Hexapoda"] */
  taxonomy: [label: string, value: string][];
  iucnStatus: IucnStatus;
  populationTrend: PopulationTrend;
  description: string;
  distribution: { map: ImageSource; hotspots: Hotspot[] };
  communityPhotos: CommunityPhoto[];
};
