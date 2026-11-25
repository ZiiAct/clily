import type { ImageSource } from './content.types';

/** Article body block: paragraphs with an optional photo in between (Figma: News Isi). */
export type ArticleBlock = { type: 'paragraph'; text: string } | { type: 'image'; image: ImageSource };

/** PRD Article, extended with what the news list and detail screens show. */
export type NewsArticle = {
  id: string;
  title: string;
  image: ImageSource;
  sourceName: string;
  sourceLogo: ImageSource;
  /** Circle behind the source logo */
  sourceColor: string;
  url: string;
  body: ArticleBlock[];
};

export type Comment = {
  id: string;
  author: string;
  text: string;
};

/** PRD Trivia entity (Figma: TRIVIA). */
export type Trivia = {
  id: string;
  title: string;
  body: string[];
  image: ImageSource;
  source: string;
  authorName: string;
};

export type TriviaSubmission = {
  headline: string;
  body: string;
  source: string;
  photoUri?: string;
};
