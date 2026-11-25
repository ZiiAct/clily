import { useQuery } from '@tanstack/react-query';

import { getSpeciesDetail, getTaxonPage, searchSpecies } from '../api/encyclopediaApi';
import type { SpeciesFilters } from '../types/species.types';

export const useTaxonPage = (taxonId: string | null) =>
  useQuery({ queryKey: ['taxon', taxonId], queryFn: () => getTaxonPage(taxonId) });

export const useSpeciesDetail = (id: string) =>
  useQuery({ queryKey: ['species', 'detail', id], queryFn: () => getSpeciesDetail(id), retry: false });

export const useSpeciesSearch =(query: string, filters: SpeciesFilters) =>
  useQuery({ queryKey: ['species', 'search', query, filters], queryFn: () => searchSpecies(query, filters) });
