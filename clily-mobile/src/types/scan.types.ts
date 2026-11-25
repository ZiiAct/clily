import type { ImageSource } from './content.types';
import type { ConservationFilter } from './species.types';

/** PRD ScanResult: what the identification API returns for one photo. */
export type ScanResult = {
  id: string;
  imageUri: string;
  speciesId: string;
  /** 0–1 */
  confidence: number;
  createdAt: string;
  location?: string;
};

export type GalleryKingdom = 'animalia' | 'plantae' | 'fungi';
export type GalleryHabitat = 'rumahan' | 'perkebunan' | 'darat' | 'air' | 'hutan-kecil' | 'hutan-besar' | 'udara';

/** One photo in "Galeri Fotomu" (a saved scan). */
export type GalleryItem = {
  id: string;
  /** Card label, e.g. "Common Palmfly" */
  title: string;
  /** Polaroid heading, e.g. "Kupu-kupu Common Palmfly" */
  commonName: string;
  scientificName: string;
  photo: ImageSource;
  /** ISO timestamp */
  takenAt: string;
  location?: string;
  kingdom: GalleryKingdom;
  habitat: GalleryHabitat[];
  status: ConservationFilter;
  /** Links to the encyclopedia when the species is known */
  speciesId?: string;
  confidence?: number;
};

export type GalleryFilters = {
  kingdom: GalleryKingdom[];
  habitat: GalleryHabitat[];
  status: ConservationFilter[];
};
