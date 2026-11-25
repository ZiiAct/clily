/** Resolves mock data after a short delay so loading states are exercised. */
export function mockResponse<T>(data: T, delayMs = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}
