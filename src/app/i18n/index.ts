import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      // Common
      'app.name': 'Kebijakan Tracker',
      'app.description': 'Platform Pelacakan Kebijakan Publik Indonesia',
      
      // Navigation
      'nav.home': 'Beranda',
      'nav.policies': 'Kebijakan',
      'nav.submit': 'Kirim Kebijakan',
      'nav.list': 'Daftar Kebijakan',
      'nav.export': 'Ekspor CSV',
      
      // Search
      'search.placeholder': 'Cari kebijakan...',
      'search.agency': 'Instansi',
      'search.year': 'Tahun',
      'search.all_agencies': 'Semua Instansi',
      'search.all_years': 'Semua Tahun',
      'search.button': 'Cari',
      
      // Policy List
      'policy.empty': 'Belum ada kebijakan yang tersedia.',
      'policy.load_error': 'Gagal memuat data kebijakan',
      'policy.verified': 'Terverifikasi',
      'policy.draft': 'Draft',
      'policy.active': 'Aktif',
      'policy.expired': 'Kedaluwarsa',
      
      // Footer
      'footer.copyright': '© 2025 Kebijakan Tracker. Dibuat untuk Indonesia.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 