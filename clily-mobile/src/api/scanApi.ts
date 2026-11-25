import { MOCK_SPECIES } from '../mocks/encyclopedia';
import type { ScanResult } from '../types/scan.types';
import { mockResponse } from './mock';

/**
 * POST /scan (multipart photo). Mock: always identifies the Common Palmfly
 * from the Figma scan result, after a delay long enough to show the
 * "identifikasi objek" state. Swap for the real request (see services/bugService.ts).
 */
export async function identifySpecies(imageUri: string): Promise<ScanResult> {
  const species = MOCK_SPECIES.find((s) => s.id === 'elymnias-hypermnestra');
  if (!species) throw new Error('Spesies tidak dikenali');

  return mockResponse(
    {
      id: `scan-${Date.now()}`,
      imageUri,
      speciesId: species.id,
      confidence: 0.92,
      createdAt: new Date().toISOString(),
    },
    1800,
  );
}
