'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  NewspaperIcon,
  AcademicCapIcon,
  MegaphoneIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  CalendarIcon,
  BookOpenIcon,
  GlobeAltIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface Policy {
  id: string;
  title: string;
  agency: string;
  createdAt: string;
  impactSummary: string;
  status: string;
  isVerified: boolean;
  contributors: number;
  discussions: number;
  period: string;
  mediaCoverage: {
    international: string[];
    national: string[];
  };
  timeline: {
    date: string;
    event: string;
    impact: string;
  }[];
  effectiveDate?: string;
  topics?: string[];
}

export default function Home() {
  const [recentPolicies, setRecentPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const loadRecentPolicies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const policiesRef = collection(db, 'policies');
        let q = query(policiesRef, orderBy('createdAt', 'desc'), limit(10));
        
        if (selectedPeriod !== 'all') {
          q = query(q, where('period', '==', selectedPeriod));
        }
        
        const querySnapshot = await getDocs(q);
        
        const policies: Policy[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Policy[];
        
        setRecentPolicies(policies);
      } catch (error) {
        console.error('Error loading policies:', error);
        setError(t('errors.failedToLoadPolicies'));
      } finally {
        setLoading(false);
      }
    };

    loadRecentPolicies();
  }, [t, selectedPeriod]);

  const startVoiceSearch = () => {
    setIsVoiceSearchActive(true);
    // Implementasi voice search akan ditambahkan
  };

  const filteredPolicies = recentPolicies.filter(policy =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.impactSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 mb-8">
                  <span className="text-sm font-medium text-blue-800">Platform Kebijakan Publik Indonesia</span>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Perintis</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Timeline Kebijakan Indonesia
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Mendokumentasikan setiap kebijakan pemerintah, dampaknya, dan liputan media dalam timeline yang terstruktur. Dibangun oleh masyarakat untuk transparansi dan pembelajaran.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-xl shadow-lg w-full bg-white/80 backdrop-blur-sm border border-gray-100">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        placeholder="Cari kebijakan, dampak, atau topik..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-12 pr-12 py-4 border-0 rounded-xl leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                      />
                      <button
                        onClick={startVoiceSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <MicrophoneIcon className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100/50">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">Total Kebijakan</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100/50">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Terverifikasi</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100/50">
              <div className="text-2xl font-bold text-purple-600">5,678</div>
              <div className="text-sm text-gray-600">Kontributor</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/50">
              <div className="text-2xl font-bold text-amber-600">12,345</div>
              <div className="text-sm text-gray-600">Diskusi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Period Filter */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 py-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedPeriod('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedPeriod === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Semua Periode
            </button>
            <button
              onClick={() => setSelectedPeriod('2024')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedPeriod === '2024'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              2024
            </button>
            <button
              onClick={() => setSelectedPeriod('2023')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedPeriod === '2023'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              2023
            </button>
            <button
              onClick={() => setSelectedPeriod('2022')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedPeriod === '2022'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              2022
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Fitur Utama</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Platform Komprehensif untuk Analisis Kebijakan
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center space-x-4 p-6 bg-white rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <ClockIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Timeline Kronologis</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Mendokumentasikan setiap kebijakan dalam urutan waktu dengan detail dampak dan liputan media.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center space-x-4 p-6 bg-white rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Liputan Media</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Mengumpulkan dan mengorganisir liputan media nasional dan internasional terkait setiap kebijakan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center space-x-4 p-6 bg-white rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Diskusi Komunitas</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Forum diskusi mendalam untuk analisis kebijakan dan sharing pengetahuan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center space-x-4 p-6 bg-white rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <BookOpenIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Pusat Pembelajaran</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Tutorial dan panduan untuk memahami dan menganalisis kebijakan publik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Policies Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Kebijakan Terbaru
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Dokumentasi terbaru dari berbagai kebijakan pemerintah Indonesia
            </p>
          </div>
          <Link
            href="/kebijakan"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg shadow-blue-500/20 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Lihat Semua
          </Link>
        </div>
        {loading ? (
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mt-4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative" role="alert">
            <strong className="font-bold">{error}</strong>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('home.noPolicies')}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPolicies.map((policy) => (
              <Link 
                href={`/kebijakan/${policy.id}`} 
                key={policy.id}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/50 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-100"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {policy.agency}
                        </span>
                        {policy.isVerified && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
                            Terverifikasi
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {policy.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        policy.status === 'ACTIVE' 
                          ? 'bg-emerald-50 text-emerald-700'
                          : policy.status === 'DRAFT'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {policy.status === 'ACTIVE' ? 'Aktif' : policy.status === 'DRAFT' ? 'Draft' : 'Arsip'}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {policy.impactSummary}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {format(new Date(policy.createdAt), 'dd MMM yyyy', { locale: idLocale })}
                      </span>
                      {policy.effectiveDate && (
                        <span className="flex items-center">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          {format(new Date(policy.effectiveDate), 'dd MMM yyyy', { locale: idLocale })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {policy.topics?.slice(0, 2).map((topic) => (
                        <span 
                          key={topic} 
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {topic}
                        </span>
                      ))}
                      {policy.topics && policy.topics.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          +{policy.topics.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="relative max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Berkontribusi untuk Transparansi</span>
            <span className="block">Mulai Dokumentasikan Sekarang</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Mari kita bangun dokumentasi kebijakan yang komprehensif dan terstruktur. Setiap kontribusi membantu membangun pemahaman publik yang lebih baik tentang kebijakan di Indonesia.
          </p>
          <div className="mt-10">
            <Link
              href="/kirim-kebijakan"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 shadow-lg shadow-white/20 transition-all duration-200"
            >
              Mulai Kontribusi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 