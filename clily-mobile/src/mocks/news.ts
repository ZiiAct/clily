import type { Comment, NewsArticle, Trivia } from '../types/news.types';

/** Mock content copied from the Figma TRIVIA, NEWS, News Isi and Komentar frames. */

export const MOCK_TRIVIA: Trivia = {
  id: 'antlion',
  title: 'Mengapa undur-undur berjalan mundur?',
  body: [
    'Secara anatomis, alasan utama larva undur-undur bergerak mundur bukan tanpa sebab, melainkan dikarenakan struktur kaki mereka yang menekuk ke arah depan.',
    'Konstruksi kaki seperti ini menyulitkan mereka untuk melangkah maju. Namun, mekanisme gerak mundur ini justru memberikan keuntungan adaptif yang besar. Gerakan tersebut sangat efisien membantu mereka membenamkan diri ke dalam pasir saat menggali lubang jebakan berbentuk corong untuk menangkap mangsa.',
    'Fakta menariknya, perilaku ini hanya terjadi pada fase larva. Setelah melalui proses metamorfosis sempurna dan menjadi serangga dewasa (imago), mereka akan berubah bentuk menjadi serangga bersayap indah yang sekilas mirip capung (dari famili Myrmeleontidae) dan tentu saja sudah dapat terbang atau bergerak maju.',
  ],
  image: require('./images/trivia-antlion.jpg'),
  source: 'Encyclopedia Britannica – Antlion (Insect)',
  authorName: 'Tingky Wingky',
};

const CORAL_IMAGE = require('./images/article-coral.jpg');

export const MOCK_ARTICLES: NewsArticle[] = [
  {
    // Same id as the Beranda highlight so "selengkapnya" opens this article.
    id: 'coral-bleaching',
    title: 'More Than 80% of Coral Reefs are Bleaching',
    image: CORAL_IMAGE,
    sourceName: 'Forest Digest',
    sourceLogo: require('./images/logo-forest.png'),
    sourceColor: '#4E9925',
    url: 'https://www.forestdigest.com',
    body: [
      {
        type: 'paragraph',
        text: 'A year ago, in April 2024, the National Oceanic and Atmospheric Administration (NOAA) and the International Coral Reef Initiatives confirmed that we were experiencing the fourth global coral bleaching event. This massive coral bleaching event is still occurring today.',
      },
      {
        type: 'paragraph',
        text: 'Over the two years from January 1, 2023, to April 30, 2025, 83.7% of coral reefs worldwide bleached. This event was documented in at least 83 countries and territories. This figure makes the current global coral bleaching event the worst in recorded history.',
      },
      { type: 'image', image: CORAL_IMAGE },
      {
        type: 'paragraph',
        text: "Previously, the worst record occurred during the third global coral bleaching event from 2014 to 2017. At that time, 68.2% of the world's coral reefs bleached. The world also experienced its first global coral bleaching event in 1998 and its second in 2010. With the increasingly shorter intervals between global coral bleaching events, coral reefs have less time to recover.",
      },
      {
        type: 'paragraph',
        text: "Indonesia, home to 16% of the world's coral reefs, has also been impacted. In the Matra Marine Conservation Area in West Nusa Tenggara, only 247 hectares, or 10% of the Gili Matra coral reef ecosystem, remain intact.",
      },
      {
        type: 'paragraph',
        text: 'Gili Matra is one of 12 marine conservation areas in Indonesia whose coral reefs are bleaching annually until 2030. If climate change persists, it is estimated that coral reefs in 99 Indonesian marine conservation areas will bleach annually by 2044. By 2075, it is predicted that all 161 Indonesian marine conservation areas will bleach annually. It is not impossible that coral reefs will be destroyed within the next half century.',
      },
    ],
  },
  {
    id: 'insect-extinction',
    title: 'Up to Three Insect Species Become Extinct in Australia Every Week',
    image: require('./images/article-insect.jpg'),
    sourceName: 'BBC NEWS',
    sourceLogo: require('./images/logo-bbc.png'),
    sourceColor: '#000000',
    url: 'https://www.bbc.com/news',
    body: [
      {
        type: 'paragraph',
        text: 'Scientists warn that insect species in Australia are disappearing faster than they can be described. Habitat loss, bushfires and climate change are pushing many species to extinction before they are ever studied.',
      },
      {
        type: 'paragraph',
        text: 'Insects pollinate crops, recycle nutrients and feed birds and reptiles. Researchers are calling for urgent surveys and protected habitats so that the remaining species can be recorded and conserved.',
      },
    ],
  },
  {
    // Figma reuses the insect headline on this card; the photo shows plastic waste at sea.
    id: 'ocean-plastic',
    title: 'Sampah Plastik di Laut Ancam Kehidupan Biota Laut',
    image: require('./images/article-plastic.jpg'),
    sourceName: 'UNAIR',
    sourceLogo: require('./images/logo-unair.png'),
    sourceColor: '#FFFFFF',
    url: 'https://unair.ac.id',
    body: [
      {
        type: 'paragraph',
        text: 'Botol dan kantong plastik yang terbawa ke laut terurai menjadi mikroplastik yang ikut termakan ikan, penyu dan burung laut. Peneliti mengingatkan bahwa sampah plastik dapat bertahan ratusan tahun di lautan.',
      },
      {
        type: 'paragraph',
        text: 'Mengurangi plastik sekali pakai, memilah sampah dari rumah, dan ikut serta dalam aksi bersih pantai menjadi langkah sederhana untuk melindungi ekosistem laut Indonesia.',
      },
    ],
  },
  {
    id: 'malino-farmers',
    title: 'Petani Sayur Malino Didera Krisis Iklim',
    image: require('./images/article-malino.jpg'),
    sourceName: 'CNN Indonesia',
    sourceLogo: require('./images/logo-cnn.png'),
    sourceColor: '#CC0000',
    url: 'https://www.cnnindonesia.com',
    body: [
      {
        type: 'paragraph',
        text: 'Petani sayur di dataran tinggi Malino, Sulawesi Selatan, mengeluhkan cuaca yang makin sulit ditebak. Musim hujan yang bergeser membuat jadwal tanam berantakan dan hama lebih mudah menyerang.',
      },
      {
        type: 'paragraph',
        text: 'Sebagian petani mulai beralih ke tanaman yang lebih tahan cuaca dan memanfaatkan informasi prakiraan iklim untuk menentukan waktu tanam.',
      },
    ],
  },
];

/** Komentar sheet (Figma: Frame 130); shown for the coral article. */
export const MOCK_COMMENTS: Record<string, Comment[]> = {
  'coral-bleaching': [
    {
      id: 'c1',
      author: 'Bambang Ajisatyo',
      text: 'Ini benar-benar memprihatinkan. Kita memang harus mulai peduli dengan lingkungan sekitar kita dan juga mulai mengingatkan yang lain terhadap masalah ini. Semoga Alam lekas sembuh.',
    },
    { id: 'c2', author: 'Axela Arin', text: 'Waduhhhhh, pusing sih kalo udah gini. Ini masalah global paling bahaya sih. Semoga ada solusi cepet!' },
    {
      id: 'c3',
      author: 'Haji Sanusi',
      text: 'Agak khawatir saya dengan kondisi indonesia ini. Padahal dulu saya selalu bangga dengan alam di Indonesia, tapi liat berita ini, saya mulai ragu dengan rasa bangga saya. Apa sudah saatnya saya jadi Presiden ya?',
    },
    { id: 'c4', author: 'Hamada Asahi', text: 'Ayo dong pemerintah dunia dan Indonesia, do something!' },
    {
      id: 'c5',
      author: 'Vestia Zeta',
      text: 'Duhhhh, ini makin ribet dengan banyaknya kebijakan yang aneh-aneh tiap harinya juga nih! Bukan cuma di Indonesia, tapi kayaknya pemerintah di dunia gak akan pernah 100% peduli sama isu ini!',
    },
  ],
};
