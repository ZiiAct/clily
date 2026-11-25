import { useQuery } from '@tanstack/react-query';

import { getArticle, getArticles, getComments, getTodayTrivia } from '../api/newsApi';

export const useTodayTrivia = () => useQuery({ queryKey: ['trivia', 'today'], queryFn: getTodayTrivia });

export const useArticles = (query: string) =>
  useQuery({ queryKey: ['articles', 'list', query], queryFn: () => getArticles(query) });

export const useArticle = (id: string) =>
  useQuery({ queryKey: ['articles', 'detail', id], queryFn: () => getArticle(id), retry: false });

export const useComments = (articleId: string) =>
  useQuery({ queryKey: ['articles', 'comments', articleId], queryFn: () => getComments(articleId) });
