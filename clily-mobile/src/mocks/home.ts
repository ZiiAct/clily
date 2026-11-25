import type { Article, Fact, Weather } from '../types/content.types';

/** Mock data copied from the Figma Beranda and Cuaca frames. */

export const MOCK_HIGHLIGHTS: Article[] = [
  {
    id: 'coral-bleaching',
    headline: 'Alarm Merah dari Laut:',
    summary: 'Suhu Global Naik, Terumbu Karang di Indonesia Terancam Pemutihan Massal.',
    images: [require('./images/news-coral-fish.jpg'), require('./images/news-coral.jpg')],
    sourceName: 'Forest Digest',
    url: 'https://www.forestdigest.com',
    isBookmarked: false,
  },
  {
    id: 'deforestation',
    headline: 'Deforestasi Makin Brutal:',
    summary: 'Ekosistem Hutan Kritis, Pakar Peringatkan Ancaman Bencana Ekologis dan Krisis Air Bersih.',
    images: [require('./images/news-deforestation.jpg'), require('./images/news-deforestation-2.jpg')],
    sourceName: 'CNN Indonesia',
    url: 'https://www.cnnindonesia.com',
    isBookmarked: false,
  },
  {
    id: 'microplastic',
    headline: 'Studi Terbaru Ungkap Fakta:',
    summary:
      'Polusi Mikroplastik Ditemukan di Ekosistem Paling Terpencil, dari Puncak Gunung Hingga Dasar Laut.',
    images: [require('./images/news-microplastic.jpg')],
    sourceName: 'BBC News',
    url: 'https://www.bbc.com',
    isBookmarked: false,
  },
];

export const MOCK_FACTS: Fact[] = [
  {
    id: 'antlion',
    text: 'Nama "undur-undur" dalam bahasa Indonesia berasal dari cara larva hewan ini berjalan mundur saat bergerak di permukaan pasir.',
    image: require('./images/trivia-antlion.jpg'),
  },
  {
    id: 'otter',
    text: 'Berang-berang laut tidur sambil berpegangan tangan agar mereka tidak hanyut terpisah satu sama lain saat di air.',
    image: require('./images/trivia-otter.jpg'),
  },
  {
    id: 'grass',
    text: 'Bau rumput yang baru dipotong sebenarnya adalah "sinyal bahaya" atau tanda stres yang dikeluarkan oleh tanaman tersebut.',
    image: require('./images/trivia-grass.jpg'),
  },
  {
    id: 'koala',
    text: 'Sidik jari koala sangat mirip dengan sidik jari manusia sehingga berpotensi membingungkan di tempat kejadian perkara.',
    image: require('./images/trivia-koala.jpg'),
  },
];

export const MOCK_WEATHER: Weather = {
  location: 'Cipadung',
  observedAt: '11.00',
  temperature: 28,
  feelsLike: 32,
  condition: 'cerah-berawan',
  humidity: 69,
  windSpeedKmh: 3,
  rainChance: 40,
  airQuality: 'Sangat Baik',
  forecast: [
    { day: 'Selasa', condition: 'cerah', temperature: 30 },
    { day: 'Rabu', condition: 'hujan-angin', temperature: 21 },
    { day: 'Kamis', condition: 'berawan', temperature: 24 },
    { day: 'Jum’at', condition: 'badai-petir', temperature: 19 },
    { day: 'Sabtu', condition: 'mendung', temperature: 25 },
    { day: 'Minggu', condition: 'cerah-berawan', temperature: 27 },
  ],
};

export const MOCK_AVATAR = require('./images/avatar.jpg');
