import { useCallback } from 'react';

import { getSpeciesDetail } from '../api/encyclopediaApi';
import { identifySpecies } from '../api/scanApi';
import { useGalleryStore } from '../store/galleryStore';
import type { GalleryHabitat, GalleryItem, GalleryKingdom } from '../types/scan.types';
import type { HabitatFilter } from '../types/species.types';

/** Encyclopedia habitats → gallery habitat tags (the gallery filter uses its own Figma groups). */
const HABITAT_TO_GALLERY: Record<HabitatFilter, GalleryHabitat> = {
  darat: 'darat',
  laut: 'air',
  'air-tawar': 'air',
  hutan: 'hutan-kecil',
};

/**
 * Identify a photo and save it to "Galeri Fotomu".
 * Returns the gallery item id, which is also the scan id used by the result screen.
 */
export function useScan() {
  const add = useGalleryStore((s) => s.add);

  return useCallback(
    async (photoUri: string): Promise<string> => {
      const scan = await identifySpecies(photoUri);
      const species = await getSpeciesDetail(scan.speciesId);
      const kingdom = (species.taxonomy.find(([label]) => label === 'Kingdom')?.[1] ?? 'Animalia').toLowerCase() as GalleryKingdom;

      const item: GalleryItem = {
        id: scan.id,
        title: species.englishName,
        commonName: species.commonName,
        scientificName: species.scientificName,
        photo: { uri: scan.imageUri },
        takenAt: scan.createdAt,
        location: scan.location,
        kingdom,
        habitat: [...new Set(species.habitat.map((h) => HABITAT_TO_GALLERY[h]))],
        status: species.conservationStatus,
        speciesId: species.id,
        confidence: scan.confidence,
      };
      add(item);
      return item.id;
    },
    [add],
  );
}
