import { useQuery } from '@tanstack/react-query';

import { getCurrentWeather, getFacts, getTodayHighlights } from '../api/homeApi';

export const useTodayHighlights = () =>
  useQuery({ queryKey: ['articles', 'highlights'], queryFn: getTodayHighlights });

export const useFacts = () => useQuery({ queryKey: ['facts'], queryFn: getFacts });

export const useWeather = () => useQuery({ queryKey: ['weather', 'current'], queryFn: getCurrentWeather });
