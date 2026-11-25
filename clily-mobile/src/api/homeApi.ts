import { MOCK_FACTS, MOCK_HIGHLIGHTS, MOCK_WEATHER } from '../mocks/home';
import type { Article, Fact, Weather } from '../types/content.types';
import { mockResponse } from './mock';

/**
 * Beranda data. Each function returns mock data for now; swap the body for a
 * real request (PRD: GET /articles, GET /trivia, GET /weather) without touching screens.
 */

export function getTodayHighlights(): Promise<Article[]> {
  return mockResponse(MOCK_HIGHLIGHTS);
}

export function getFacts(): Promise<Fact[]> {
  return mockResponse(MOCK_FACTS);
}

export function getCurrentWeather(): Promise<Weather> {
  return mockResponse(MOCK_WEATHER);
}
