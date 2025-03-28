import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      nav: {
        home: 'Beranda',
        policies: 'Kebijakan',
        submit: 'Kirim Kebijakan',
        bookmarks: 'Bookmark',
        profile: 'Profil',
        signIn: 'Masuk',
        signOut: 'Keluar',
      },
      home: {
        title: 'Perintis - Platform Kebijakan Publik Indonesia',
        description: 'Temukan dan pahami kebijakan publik di Indonesia dengan mudah',
        searchPlaceholder: 'Cari kebijakan...',
        recentPolicies: 'Kebijakan Terbaru',
        readMore: 'Baca selengkapnya',
      },
      policy: {
        title: 'Judul Kebijakan',
        agency: 'Lembaga',
        date: 'Tanggal',
        status: 'Status',
        impact: 'Dampak',
        officialDoc: 'Dokumen Resmi',
        mediaCoverage: 'Liputan Media',
        verification: 'Verifikasi',
        verified: 'Terverifikasi',
        unverified: 'Belum diverifikasi',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        policies: 'Policies',
        submit: 'Submit Policy',
        bookmarks: 'Bookmarks',
        profile: 'Profile',
        signIn: 'Sign In',
        signOut: 'Sign Out',
      },
      home: {
        title: 'Perintis - Indonesian Public Policy Platform',
        description: 'Discover and understand public policies in Indonesia easily',
        searchPlaceholder: 'Search policies...',
        recentPolicies: 'Recent Policies',
        readMore: 'Read more',
      },
      policy: {
        title: 'Policy Title',
        agency: 'Agency',
        date: 'Date',
        status: 'Status',
        impact: 'Impact',
        officialDoc: 'Official Document',
        mediaCoverage: 'Media Coverage',
        verification: 'Verification',
        verified: 'Verified',
        unverified: 'Unverified',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 