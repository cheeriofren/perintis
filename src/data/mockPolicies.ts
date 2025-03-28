import { Policy } from '@/types/policy';

export const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Program Kartu Prakerja 2024',
    description: 'Program pengembangan kompetensi kerja yang memberikan bantuan pelatihan dan insentif untuk pencari kerja dan pekerja yang terdampak COVID-19.',
    agency: 'Kementerian Ketenagakerjaan',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    status: 'ACTIVE',
    isVerified: true,
    verificationDetails: {
      verifiedBy: 'Tim Verifikasi Kemnaker',
      verifiedAt: new Date('2024-01-16'),
      method: 'manual',
      blockchainHash: '0x1234...5678'
    },
    documentUrl: 'https://storage.perintis.id/policies/kartu-prakerja-2024.pdf',
    documentType: 'pdf',
    effectiveDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    topics: ['Ketenagakerjaan', 'Pembangunan SDM', 'Pemberdayaan Ekonomi'],
    impactSummary: 'Program ini telah membantu 5.6 juta peserta mendapatkan pelatihan dan sertifikasi, dengan tingkat penyerapan kerja mencapai 65%.',
    impacts: [
      {
        category: 'Ekonomi',
        description: 'Dampak ekonomi program Kartu Prakerja',
        metrics: [
          {
            name: 'Pertumbuhan PDB',
            value: 0.5,
            unit: '%',
            trend: 'up'
          },
          {
            name: 'Pengurangan Pengangguran',
            value: 2.1,
            unit: '%',
            trend: 'down'
          }
        ]
      },
      {
        category: 'Sosial',
        description: 'Dampak sosial program Kartu Prakerja',
        metrics: [
          {
            name: 'Tingkat Partisipasi',
            value: 85,
            unit: '%',
            trend: 'up'
          },
          {
            name: 'Kepuasan Peserta',
            value: 92,
            unit: '%',
            trend: 'stable'
          }
        ]
      }
    ],
    mediaCoverage: [
      {
        title: 'Kartu Prakerja 2024: Program Pengembangan SDM yang Lebih Inklusif',
        source: 'Kompas',
        url: 'https://www.kompas.com/...',
        date: '2024-01-15',
        type: 'national',
        sentiment: 'positive',
        summary: 'Program Kartu Prakerja 2024 diperluas untuk mencakup lebih banyak kelompok masyarakat.'
      },
      {
        title: 'Indonesia\'s Job Training Program Gains International Recognition',
        source: 'Reuters',
        url: 'https://www.reuters.com/...',
        date: '2024-01-16',
        type: 'international',
        sentiment: 'positive',
        summary: 'Program Kartu Prakerja mendapat pengakuan dari World Bank sebagai model pengembangan SDM yang efektif.'
      }
    ],
    expertReviews: [
      {
        id: '1',
        expertName: 'Prof. Dr. Sri Mulyani Indrawati',
        expertise: 'Ekonomi Pembangunan',
        institution: 'Universitas Indonesia',
        review: 'Program ini telah berhasil meningkatkan kompetensi dan daya saing tenaga kerja Indonesia.',
        rating: 4.5,
        date: '2024-01-17',
        verificationStatus: 'verified'
      }
    ],
    discussions: [
      {
        id: '1',
        userId: 'user123',
        userName: 'Ahmad Fauzi',
        content: 'Program ini sangat membantu saya mendapatkan sertifikasi digital marketing.',
        date: '2024-01-18',
        likes: 45,
        replies: 12,
        sentiment: 'positive',
        aiAnalysis: {
          relevance: 0.95,
          keyPoints: ['pengalaman pribadi', 'sertifikasi', 'digital marketing'],
          sentiment: 'positive'
        }
      }
    ],
    contributors: 156,
    views: 12345,
    bookmarks: 789,
    aiAnalysis: {
      summary: 'Program Kartu Prakerja 2024 menunjukkan dampak positif signifikan terhadap pengembangan SDM dan pengurangan pengangguran.',
      keyPoints: [
        'Peningkatan kompetensi kerja',
        'Pengurangan pengangguran',
        'Pertumbuhan ekonomi'
      ],
      sentiment: 'positive',
      relatedPolicies: ['2', '3'],
      riskAssessment: {
        level: 'low',
        factors: ['Anggaran terbatas', 'Kualitas pelatihan']
      }
    },
    blockchain: {
      hash: '0x1234...5678',
      timestamp: new Date('2024-01-15'),
      previousHash: '0xabcd...efgh'
    },
    arSimulation: {
      enabled: true,
      url: 'https://ar.perintis.id/kartu-prakerja',
      type: '3d'
    },
    collaborativeAnnotations: {
      enabled: true,
      annotations: []
    }
  },
  {
    id: '2',
    title: 'Program Indonesia Sejahtera',
    description: 'Program bantuan sosial yang menyasar keluarga prasejahtera untuk meningkatkan kesejahteraan dan akses layanan dasar.',
    agency: 'Kementerian Sosial',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    status: 'ACTIVE',
    isVerified: true,
    verificationDetails: {
      verifiedBy: 'Tim Verifikasi Kemensos',
      verifiedAt: new Date('2024-01-11'),
      method: 'ai',
      blockchainHash: '0xabcd...efgh'
    },
    documentUrl: 'https://storage.perintis.id/policies/indonesia-sejahtera.pdf',
    documentType: 'pdf',
    effectiveDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    topics: ['Kesejahteraan Sosial', 'Bantuan Sosial', 'Kemiskinan'],
    impactSummary: 'Program telah menjangkau 10 juta keluarga prasejahtera dengan bantuan langsung dan pendampingan sosial.',
    impacts: [
      {
        category: 'Sosial',
        description: 'Dampak sosial program Indonesia Sejahtera',
        metrics: [
          {
            name: 'Cakupan Penerima',
            value: 10,
            unit: 'Juta',
            trend: 'up'
          },
          {
            name: 'Tingkat Kemiskinan',
            value: 9.5,
            unit: '%',
            trend: 'down'
          }
        ]
      }
    ],
    mediaCoverage: [
      {
        title: 'Program Indonesia Sejahtera: Langkah Konkret Mengentaskan Kemiskinan',
        source: 'Detik',
        url: 'https://www.detik.com/...',
        date: '2024-01-10',
        type: 'national',
        sentiment: 'positive',
        summary: 'Program bantuan sosial yang terintegrasi untuk keluarga prasejahtera.'
      }
    ],
    expertReviews: [
      {
        id: '1',
        expertName: 'Dr. Tri Rismaharini',
        expertise: 'Kesejahteraan Sosial',
        institution: 'Kementerian Sosial',
        review: 'Program ini telah berhasil meningkatkan akses layanan dasar bagi keluarga prasejahtera.',
        rating: 4.8,
        date: '2024-01-12',
        verificationStatus: 'verified'
      }
    ],
    discussions: [],
    contributors: 89,
    views: 8765,
    bookmarks: 432,
    aiAnalysis: {
      summary: 'Program Indonesia Sejahtera menunjukkan efektivitas dalam pengentasan kemiskinan dan peningkatan kesejahteraan.',
      keyPoints: [
        'Bantuan langsung',
        'Pendampingan sosial',
        'Pengurangan kemiskinan'
      ],
      sentiment: 'positive',
      relatedPolicies: ['1', '3'],
      riskAssessment: {
        level: 'medium',
        factors: ['Data penerima', 'Koordinasi antar lembaga']
      }
    },
    blockchain: {
      hash: '0xabcd...efgh',
      timestamp: new Date('2024-01-10'),
      previousHash: '0xijkl...mnop'
    },
    arSimulation: {
      enabled: false,
      url: '',
      type: '3d'
    },
    collaborativeAnnotations: {
      enabled: true,
      annotations: []
    }
  }
]; 