import type { ImageSourcePropType } from 'react-native';

/**
 * Images are typed as ImageSourcePropType so mocks can use bundled files today
 * and the API layer can map URLs to { uri } later without changing components.
 */
export type ImageSource = ImageSourcePropType;

/** News article (PRD: Article). `summary` and `images` feed the Beranda highlights card. */
export type Article = {
  id: string;
  /** Bold lead-in, e.g. "Alarm Merah dari Laut:" */
  headline: string;
  summary: string;
  /** First image is the main thumbnail; Beranda shows up to two per article. */
  images: ImageSource[];
  sourceName: string;
  url: string;
  isBookmarked: boolean;
};

/** Short fact for the Beranda "Tahukah kamu?" carousel. */
export type Fact = {
  id: string;
  text: string;
  image: ImageSource;
};

export type WeatherCondition =
  | 'cerah'
  | 'cerah-berawan'
  | 'berawan'
  | 'mendung'
  | 'hujan-angin'
  | 'badai-petir';

export type DailyForecast = {
  day: string;
  condition: WeatherCondition;
  temperature: number;
};

export type Weather = {
  location: string;
  /** Local time label, e.g. "11.00" */
  observedAt: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeedKmh: number;
  rainChance: number;
  airQuality: string;
  forecast: DailyForecast[];
};
