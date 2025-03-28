import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase-admin';

const samplePolicies = [
  {
    id: 'ruu-polri-2024',
    title: 'Rancangan Undang-Undang Perubahan Ketiga atas UU No. 2 Tahun 2002 tentang Kepolisian Negara Republik Indonesia (RUU Polri)',
    agency: 'Badan Legislasi Dewan Perwakilan Rakyat Republik Indonesia',
    createdAt: Timestamp.fromDate(new Date('2024-05-28')),
    updatedAt: Timestamp.fromDate(new Date('2024-06-14')),
    status: 'DRAFT',
    type: 'Rancangan Undang-Undang',
    topics: [
      'Reformasi Kepolisian',
      'Hak Asasi Manusia',
      'Kewenangan Kepolisian'
    ],
    impactSummary: `RUU Polri berisi sejumlah pasal yang memperluas kewenangan kepolisian, menjadikannya institusi "superbody", dan gagal mengatasi masalah fundamental dalam institusi kepolisian, termasuk pengawasan dan kontrol publik.`,
    officialDocumentLink: 'https://t.co/m3kAY50HsC',
    isVerified: true,
    verifiedBy: 'DPR RI',
    expertReviews: [
      {
        expert: {
          name: 'Pusat Studi Hukum dan Kebijakan Indonesia',
          title: 'Lembaga Penelitian Independen',
          specialization: 'Kajian Hukum dan Kebijakan',
          avatar: 'https://ui-avatars.com/api/?name=PSHK&background=0066cc&color=fff'
        },
        institution: 'PSHK',
        date: '2024-06-14',
        content: `Kajian PSHK menunjukkan bahwa RUU Polri ini bermasalah karena:
1. Menjadikan Polri sebagai lembaga "superbody" dengan kewenangan yang terlalu luas
2. Gagal mendesain perbaikan fundamental dalam institusi kepolisian
3. Kurangnya mekanisme pengawasan dan kontrol publik
4. Berpotensi menimbulkan tumpang tindih kewenangan dengan lembaga lain`,
        isVerified: true,
        documentUrl: 'https://pshk.or.id/publikasi/tolak-ruu-polri-kepolisian-negara-republik-indonesia-yang-menjadikan-polri-lembaga-superbody-dan-gagal-mendesain-perbaikan-fundamental/',
        viewerType: 'web'
      }
    ],
    mediaCoverage: [
      'https://pshk.or.id/publikasi/tolak-ruu-polri-kepolisian-negara-republik-indonesia-yang-menjadikan-polri-lembaga-superbody-dan-gagal-mendesain-perbaikan-fundamental/'
    ],
    timeline: [
      {
        date: '2024-05-28',
        event: 'Rancangan Undang-Undang dikeluarkan',
        type: 'DRAFT_RELEASED'
      },
      {
        date: '2024-06-14',
        event: 'Kajian PSHK dirilis',
        type: 'EXPERT_REVIEW'
      }
    ]
  }
];

async function seedData() {
  try {
    console.log('Mulai seeding data...');
    
    for (const policy of samplePolicies) {
      const docRef = await addDoc(collection(db, 'policies'), policy);
      console.log(`Kebijakan berhasil ditambahkan dengan ID: ${docRef.id}`);
    }
    
    console.log('Seeding data selesai!');
  } catch (error) {
    console.error('Error saat seeding data:', error);
  }
}

seedData(); 