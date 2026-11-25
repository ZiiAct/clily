import { create } from 'zustand';

import type { Comment } from '../types/news.types';

/**
 * Client-side state for Berita until the backend exists:
 * bookmarks (POST /articles/:id/bookmark), likes, and comments the user adds.
 */
type NewsState = {
  bookmarks: Record<string, boolean>;
  likedComments: Record<string, boolean>;
  /** Comments added on this device, per article (newest last) */
  myComments: Record<string, Comment[]>;
  toggleBookmark: (articleId: string) => void;
  toggleLike: (commentId: string) => void;
  addComment: (articleId: string, comment: Comment) => void;
};

export const useNewsStore = create<NewsState>((set) => ({
  bookmarks: {},
  likedComments: {},
  myComments: {},
  toggleBookmark: (id) => set((s) => ({ bookmarks: { ...s.bookmarks, [id]: !s.bookmarks[id] } })),
  toggleLike: (id) => set((s) => ({ likedComments: { ...s.likedComments, [id]: !s.likedComments[id] } })),
  addComment: (articleId, comment) =>
    set((s) => ({ myComments: { ...s.myComments, [articleId]: [...(s.myComments[articleId] ?? []), comment] } })),
}));
