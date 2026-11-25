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
