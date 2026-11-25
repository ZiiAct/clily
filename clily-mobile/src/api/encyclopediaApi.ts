import { MOCK_SPECIES, MOCK_TAXA } from '../mocks/encyclopedia';
import type { Species, SpeciesFilters, Taxon } from '../types/species.types';
import { mockResponse } from './mock';

/**
 * Ensiklopedia data. Mock implementations of the PRD endpoints:
 * GET /species?kingdom=&q=&habitat=&diet=&traits=&status= and the taxonomy tree.
 */

export type TaxonPage = {
  /** The taxon whose children are listed (null = all kingdoms) */
  taxon: Taxon | null;
  /** Path from the kingdom down to `taxon`, for the breadcrumb */
  path: Taxon[];
  children: Taxon[];
  /** Species when `taxon` is a genus */
  species: Species[];
};

const childrenOf = (id: string | null) => MOCK_TAXA.filter((t) => t.parentId === id);

function pathTo(taxon: Taxon): Taxon[] {
  const path: Taxon[] = [];
  let current: Taxon | undefined = taxon;
  while (current) {
    path.unshift(current);
    current = MOCK_TAXA.find((t) => t.id === current?.parentId);
  }
  return path;
}

/**
 * Children of a taxon. Levels with a single child are skipped (Animalia shows
 * the classes of Arthropoda directly, Insecta shows Ordo Lepidoptera), matching Figma.
 */
export function getTaxonPage(taxonId: string | null): Promise<TaxonPage> {
  let taxon = taxonId ? MOCK_TAXA.find((t) => t.id === taxonId) ?? null : null;
  let children = childrenOf(taxon?.id ?? null);

  while (taxon && taxon.rank !== 'genus' && children.length === 1) {
    taxon = children[0];
    children = childrenOf(taxon.id);
  }

  return mockResponse({
    taxon,
    path: taxon ? pathTo(taxon) : [],
    children,
    species: taxon?.rank === 'genus' ? MOCK_SPECIES.filter((s) => s.genusId === taxon?.id) : [],
  });
}

const matchesAny = <T,>(selected: T[], values: T[]) =>
  selected.length === 0 || selected.some((v) => values.includes(v));

/** Search by name, then apply filters: OR within a group, AND across groups. */
export function searchSpecies(query: string, filters: SpeciesFilters): Promise<Species[]> {
  const q = query.trim().toLowerCase();
  const results = MOCK_SPECIES.filter(
    (s) =>
      (!q || s.scientificName.toLowerCase().includes(q) || s.commonName.toLowerCase().includes(q)) &&
      matchesAny(filters.habitat, s.habitat) &&
      matchesAny(filters.diet, s.diet) &&
      matchesAny(filters.traits, s.traits) &&
      matchesAny(filters.status, [s.conservationStatus]),
  );
  return mockResponse(results);
}
