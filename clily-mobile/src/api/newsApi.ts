import { MOCK_ARTICLES, MOCK_COMMENTS, MOCK_TRIVIA } from '../mocks/news';
import type { Comment, NewsArticle, Trivia, TriviaSubmission } from '../types/news.types';
import { mockResponse } from './mock';

/** Mock implementations of the PRD endpoints for Trivia and Berita. */

/** GET /trivia/today */
export function getTodayTrivia(): Promise<Trivia> {
  return mockResponse(MOCK_TRIVIA);
}

/** POST /trivia — the submission is reviewed before it earns XP (Figma: "Trivia Terkirim!"). */
export function submitTrivia(input: TriviaSubmission): Promise<{ id: string }> {
  if (!input.headline.trim() || !input.body.trim() || !input.source.trim()) {
    return Promise.reject(new Error('Lengkapi headline, penjelasan, dan sumber.'));
  }
  return mockResponse({ id: `trivia-${Date.now()}` }, 800);
}

/** GET /articles?q= */
export function getArticles(query = ''): Promise<NewsArticle[]> {
  const q = query.trim().toLowerCase();
  return mockResponse(
    MOCK_ARTICLES.filter((a) => !q || a.title.toLowerCase().includes(q) || a.sourceName.toLowerCase().includes(q)),
  );
}

/** GET /articles/:id */
export async function getArticle(id: string): Promise<NewsArticle> {
  const article = MOCK_ARTICLES.find((a) => a.id === id);
  if (!article) {
    await mockResponse(null);
    throw new Error('Artikel tidak ditemukan');
  }
  return mockResponse(article);
}

/** GET /articles/:id/comments */
export function getComments(articleId: string): Promise<Comment[]> {
  return mockResponse(MOCK_COMMENTS[articleId] ?? []);
}
