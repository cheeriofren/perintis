'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { getPolicyById } from '@/services/policyService';
import { Policy } from '@/types/policy';
import { 
  DocumentTextIcon, 
  NewspaperIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  BuildingOfficeIcon,
  TagIcon,
  CalendarIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon as CheckBadgeSolidIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import Link from 'next/link';
import { timestampToDate } from '@/utils/date';

// Komponen untuk Document/Web Viewer
const ContentViewer = ({ url, type = 'document' }: { url: string; type?: 'document' | 'web' }) => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200">
      {type === 'document' ? (
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
          className="w-full h-full"
          frameBorder="0"
        />
      ) : (
        <iframe
          src={url}
          className="w-full h-full"
          frameBorder="0"
        />
      )}
    </div>
  );
};

// Komponen untuk Expert Review
const ExpertReview = ({ review }: { review: any }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={review.expert.avatar}
            alt={review.expert.name}
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold text-gray-900">{review.expert.name}</h4>
                {review.isVerified && (
                  <CheckBadgeSolidIcon className="h-5 w-5 text-blue-500" title="Terverifikasi" />
                )}
              </div>
              <p className="text-sm text-gray-600">{review.expert.title}</p>
            </div>
            <span className="text-sm text-gray-500">
              {format(new Date(review.date), 'd MMMM yyyy', { locale: idLocale })}
            </span>
          </div>
          
          {review.documentUrl ? (
            <div className="mt-4">
              <ContentViewer url={review.documentUrl} type={review.viewerType || 'document'} />
            </div>
          ) : (
            <div className="mt-4 prose prose-blue max-w-none">
              {review.content}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <AcademicCapIcon className="h-4 w-4" />
              {review.expert.specialization}
            </span>
            {review.institution && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                <BuildingOfficeIcon className="h-4 w-4" />
                {review.institution}
              </span>
            )}
            {review.documentUrl && (
              <a
                href={review.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                Unduh Dokumen Lengkap
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tipe untuk related policy
interface RelatedPolicy {
  id: string;
  title: string;
  agency: string;
  date: string;
}

// Komponen untuk Related Policies
const RelatedPolicies = ({ topics, currentPolicyId }: { topics: string[], currentPolicyId: string }) => {
  const [relatedPolicies, setRelatedPolicies] = useState<RelatedPolicy[]>([]);
  
  useEffect(() => {
    // TODO: Implement fetch related policies based on topics
    // For now using mock data
    setRelatedPolicies([
      {
        id: '1',
        title: 'Kebijakan Terkait 1',
        agency: 'Kementerian A',
        date: '2024-03-01'
      },
      {
        id: '2',
        title: 'Kebijakan Terkait 2',
        agency: 'Kementerian B',
        date: '2024-02-28'
      }
    ]);
  }, [topics]);

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Kebijakan Terkait</h3>
      <div className="space-y-4">
        {relatedPolicies.map((policy: any) => (
          <a
            key={policy.id}
            href={`/kebijakan/${policy.id}`}
            className="block p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900">{policy.title}</h4>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <BuildingOfficeIcon className="h-4 w-4" />
              {policy.agency}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Komponen untuk Timeline
const PolicyTimeline = ({ policy }: { policy: Policy }) => {
  const events = [
    {
      date: policy.createdAt,
      title: 'Kebijakan Dibuat',
      icon: DocumentTextIcon
    },
    ...(policy.effectiveDate ? [{
      date: policy.effectiveDate,
      title: 'Mulai Berlaku',
      icon: CalendarIcon
    }] : []),
    ...(policy.endDate ? [{
      date: policy.endDate,
      title: 'Berakhir',
      icon: ClockIcon
    }] : [])
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={eventIdx}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                    <event.icon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">{event.title}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(new Date(event.date), 'd MMMM yyyy', { locale: idLocale })}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PolicyDetailPage() {
  const { id } = useParams();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('document'); // 'document' | 'expert-review' | 'impact'
  const [showShareDialog, setShowShareDialog] = useState(false);
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const data = await getPolicyById(id as string);
        if (data) {
          setPolicy(data);
          setIsBookmarked(data.isBookmarked || false);
        }
      } catch (error) {
        console.error('Error loading policy:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="h-[600px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!policy) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Kebijakan tidak ditemukan</h3>
          </div>
        </div>
      </Layout>
    );
  }

  const mockExpertReviews = [
    {
      expert: {
        name: "Dr. Siti Nurhaliza",
        title: "Peneliti Senior Kebijakan Publik",
        specialization: "Kebijakan Ekonomi",
        avatar: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=0066cc&color=fff"
      },
      institution: "Lembaga Penelitian Ekonomi Indonesia",
      date: "2024-03-15",
      content: "Kebijakan ini memiliki dampak signifikan terhadap pertumbuhan ekonomi sektor UMKM. Berdasarkan analisis kami, implementasi kebijakan ini berpotensi meningkatkan pertumbuhan sektor UMKM sebesar 15% dalam 2 tahun ke depan.",
      isVerified: true,
      documentUrl: "https://example.com/kajian-ekonomi.pdf",
      viewerType: "document"
    },
    {
      expert: {
        name: "Prof. Bambang Susanto",
        title: "Guru Besar Hukum Tata Negara",
        specialization: "Hukum Administrasi Negara",
        avatar: "https://ui-avatars.com/api/?name=Bambang+Susanto&background=cc0066&color=fff"
      },
      institution: "Universitas Indonesia",
      date: "2024-03-14",
      content: "Dari perspektif hukum administrasi negara, kebijakan ini telah memenuhi aspek formal dan material. Namun, perlu ada penguatan pada aspek pengawasan implementasi untuk memastikan efektivitas kebijakan.",
      isVerified: true,
      documentUrl: "https://ui.ac.id/kajian-hukum",
      viewerType: "web"
    }
  ];

  const handleShare = () => {
    setShowShareDialog(true);
    // Implement share dialog
  };

  const handleBookmark = async () => {
    // TODO: Implement bookmark functionality
    try {
      // await bookmarkPolicy(policy.id);
      setIsBookmarked(!isBookmarked);
      alert('Kebijakan berhasil disimpan');
    } catch (error) {
      console.error('Error bookmarking policy:', error);
      alert('Gagal menyimpan kebijakan');
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Beranda
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900">{policy.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{policy.title}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-sm text-gray-500">{policy.agency}</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  Dibuat: {policy.createdAt && format(timestampToDate(policy.createdAt)!, 'dd MMMM yyyy', { locale: idLocale })}
                </span>
                {policy.effectiveDate && (
                  <>
                    <span className="text-sm text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      Berlaku: {format(timestampToDate(policy.effectiveDate)!, 'dd MMMM yyyy', { locale: idLocale })}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBookmark}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isBookmarked ? (
                  <>
                    <BookmarkIcon className="mr-2 h-5 w-5 text-blue-500" />
                    Tersimpan
                  </>
                ) : (
                  <>
                    <BookmarkIcon className="mr-2 h-5 w-5 text-gray-400" />
                    Simpan
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ShareIcon className="mr-2 h-5 w-5 text-gray-400" />
                Bagikan
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Status Badges */}
            <div className="mb-6 flex items-center space-x-4">
              {policy.isVerified && (
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  <CheckCircleIcon className="mr-1.5 h-5 w-5" />
                  Terverifikasi
                </span>
              )}
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                policy.status === 'ACTIVE' 
                  ? 'bg-blue-50 text-blue-700'
                  : policy.status === 'DRAFT'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-gray-50 text-gray-700'
              }`}>
                {policy.status === 'ACTIVE' ? 'Aktif' : policy.status === 'DRAFT' ? 'Draft' : 'Arsip'}
              </span>
            </div>

            {/* Document Viewer */}
            {policy.documentUrl && (
              <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h2 className="text-lg font-medium text-gray-900">Dokumen Kebijakan</h2>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(policy.documentUrl)}&embedded=true`}
                    className="h-full w-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                  <a
                    href={policy.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
                    Unduh Dokumen
                  </a>
                </div>
              </div>
            )}

            {/* Impact Analysis */}
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h2 className="text-lg font-medium text-gray-900">Analisis Dampak</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{policy.impactSummary}</p>
                <div className="mt-4 space-y-4">
                  {policy.impacts?.map((impact, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-medium text-gray-900">{impact.area}</h3>
                      <p className="mt-1 text-sm text-gray-600">{impact.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Media Coverage */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h2 className="text-lg font-medium text-gray-900">Liputan Media</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {policy.mediaCoverage?.national?.map((coverage, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <NewspaperIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <a
                          href={coverage.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          {coverage.title}
                        </a>
                        <p className="mt-1 text-sm text-gray-500">
                          {coverage.source} • {format(new Date(coverage.date), 'dd MMMM yyyy', { locale: idLocale })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Topics */}
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h2 className="text-lg font-medium text-gray-900">Topik Terkait</h2>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {policy.topics?.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expert Reviews */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h2 className="text-lg font-medium text-gray-900">Review Ahli</h2>
              </div>
              <div className="p-4">
                {policy.expertReviews?.map((review, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div>
                        <h3 className="font-medium text-gray-900">{review.expertName}</h3>
                        <p className="text-sm text-gray-500">{review.expertTitle}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{review.review}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="mr-1.5 h-4 w-4" />
                      {format(new Date(review.date), 'dd MMMM yyyy', { locale: idLocale })}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {}}
                  className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Tambah Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 