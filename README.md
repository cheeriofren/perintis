# Perintis - Platform Kebijakan Pemerintah

Platform modern untuk manajemen, analisis, dan visualisasi kebijakan pemerintah dengan integrasi Web3, AI, dan blockchain.

## Fitur Utama

- 📊 Visualisasi kebijakan yang interaktif
- 🤖 Analisis AI untuk kebijakan
- 🔗 Verifikasi blockchain
- 📱 Antarmuka responsif
- 🌐 Penyimpanan terdesentralisasi
- 👥 Kolaborasi real-time

## Teknologi yang Digunakan

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase
- IPFS & Filecoin
- Chart.js
- TensorFlow.js

## Cara Memulai

1. Clone repositori:
```bash
git clone https://github.com/cheeriofren/perintis.git
cd perintis
```

2. Install dependensi:
```bash
npm install
```

3. Buat file `.env.local` dan isi dengan kredensial yang diperlukan:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
```

4. Jalankan server development:
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Proyek

```
perintis/
├── src/
│   ├── app/              # Halaman dan routing
│   ├── components/       # Komponen React
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Konfigurasi dan utilitas
│   ├── services/        # Layanan API
│   ├── types/           # TypeScript types
│   └── utils/           # Fungsi utilitas
├── public/              # Aset statis
└── functions/           # Firebase Cloud Functions
```

## Kontribusi

Kami menyambut kontribusi dari komunitas! Silakan buat pull request atau laporkan issues.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak

- GitHub: [@cheeriofren](https://github.com/cheeriofren)
- Twitter: [@cheeriofren](https://twitter.com/cheeriofren)
- Email: m.r.a.sujiono@gmail.com 