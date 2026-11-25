import { useQuery } from '@tanstack/react-query';

import { getTaxonPage, searchSpecies } from '../api/encyclopediaApi';
import type { SpeciesFilters } from '../types/species.types';

export const useTaxonPage = (taxonId: string | null) =>
  useQuery({ queryKey: ['taxon', taxonId], queryFn: () => getTaxonPage(taxonId) });

export const useSpeciesSearch = (query: string, filters: SpeciesFilters) =>
  useQuery({ queryKey: ['species', 'search', query, filters], queryFn: () => searchSpecies(query, filters) });
