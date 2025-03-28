'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { submitPolicy } from '@/services/policyService';
import { MediaCoverage } from '@/types/policy';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  TrashIcon,
  CalendarIcon,
  TagIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function SubmitPolicyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    agency: '',
    officialDocumentLink: '',
    impactSummary: '',
    mediaCoverage: [] as string[],
    effectiveDate: '',
    endDate: '',
    topics: [] as string[],
    policyType: '',
    status: 'draft'
  });

  const [newMediaCoverage, setNewMediaCoverage] = useState({
    title: '',
    url: '',
    type: 'local' as 'local' | 'international'
  });

  const [newTopic, setNewTopic] = useState('');

  const policyTypes = [
    'Undang-Undang',
    'Peraturan Pemerintah',
    'Peraturan Presiden',
    'Peraturan Menteri',
    'Peraturan Daerah',
    'Keputusan Presiden',
    'Keputusan Menteri',
    'Instruksi Presiden',
    'Instruksi Menteri'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMediaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMediaCoverage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addMediaCoverage = () => {
    if (!newMediaCoverage.title || !newMediaCoverage.url) {
      toast.error('Judul dan URL liputan media harus diisi');
      return;
    }

    setFormData(prev => ({
      ...prev,
      mediaCoverage: [...prev.mediaCoverage, newMediaCoverage.url]
    }));

    setNewMediaCoverage({
      title: '',
      url: '',
      type: 'local'
    });
  };

  const removeMediaCoverage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaCoverage: prev.mediaCoverage.filter((_, i) => i !== index)
    }));
  };

  const addTopic = () => {
    if (!newTopic.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, newTopic.trim()]
    }));
    setNewTopic('');
  };

  const removeTopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.agency || !formData.officialDocumentLink || !formData.impactSummary) {
      toast.error('Semua field wajib diisi');
      return;
    }

    try {
      setLoading(true);
      await submitPolicy(formData);
      toast.success('Kebijakan berhasil dikirim untuk diverifikasi');
      router.push('/kebijakan');
    } catch (error) {
      console.error('Error submitting policy:', error);
      toast.error('Gagal mengirim kebijakan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Kirim Kebijakan Baru</h1>
                <p className="mt-2 text-lg text-gray-600">
                  Bantu kami mendokumentasikan kebijakan publik di Indonesia.
                </p>
              </div>
              <Link
                href="/kebijakan"
                className="text-blue-600 hover:text-blue-500 flex items-center gap-2"
              >
                ← Kembali ke Daftar Kebijakan
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <DocumentTextIcon className="h-5 w-5" />
                Isi detail kebijakan
              </span>
              <span className="flex items-center gap-1">
                <ChartBarIcon className="h-5 w-5" />
                Analisis dampak
              </span>
              <span className="flex items-center gap-1">
                <NewspaperIcon className="h-5 w-5" />
                Tambah liputan media
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="space-y-8">
                  {/* Informasi Dasar */}
                  <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Informasi Dasar</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Judul Kebijakan
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Masukkan judul kebijakan"
                        />
                      </div>

                      <div>
                        <label htmlFor="policyType" className="block text-sm font-medium text-gray-700">
                          Jenis Kebijakan
                        </label>
                        <select
                          name="policyType"
                          id="policyType"
                          value={formData.policyType}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Pilih jenis kebijakan</option>
                          {policyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="agency" className="block text-sm font-medium text-gray-700">
                          Instansi
                        </label>
                        <div className="mt-1 flex rounded-xl shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <BuildingOfficeIcon className="h-5 w-5" />
                          </span>
                          <input
                            type="text"
                            name="agency"
                            id="agency"
                            value={formData.agency}
                            onChange={handleInputChange}
                            className="block w-full rounded-none rounded-r-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Nama instansi yang mengeluarkan kebijakan"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="officialDocumentLink" className="block text-sm font-medium text-gray-700">
                          Link Dokumen Resmi
                        </label>
                        <div className="mt-1 flex rounded-xl shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <DocumentTextIcon className="h-5 w-5" />
                          </span>
                          <input
                            type="url"
                            name="officialDocumentLink"
                            id="officialDocumentLink"
                            value={formData.officialDocumentLink}
                            onChange={handleInputChange}
                            className="block w-full rounded-none rounded-r-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="https://example.com/dokumen"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Periode Kebijakan */}
                  <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Periode Kebijakan</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700">
                          Tanggal Mulai Berlaku
                        </label>
                        <div className="mt-1 flex rounded-xl shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <CalendarIcon className="h-5 w-5" />
                          </span>
                          <input
                            type="date"
                            name="effectiveDate"
                            id="effectiveDate"
                            value={formData.effectiveDate}
                            onChange={handleInputChange}
                            className="block w-full rounded-none rounded-r-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                          Tanggal Berakhir (Opsional)
                        </label>
                        <div className="mt-1 flex rounded-xl shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <ClockIcon className="h-5 w-5" />
                          </span>
                          <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="block w-full rounded-none rounded-r-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topik/Tag */}
                  <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Topik Terkait</h2>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {formData.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            #{topic}
                            <button
                              type="button"
                              onClick={() => removeTopic(index)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-grow">
                          <div className="mt-1 flex rounded-xl shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <TagIcon className="h-5 w-5" />
                            </span>
                            <input
                              type="text"
                              value={newTopic}
                              onChange={(e) => setNewTopic(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                              className="block w-full rounded-none rounded-r-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Tambah topik (contoh: pendidikan)"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={addTopic}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ringkasan Dampak */}
                  <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Analisis Dampak</h2>
                    <div>
                      <label htmlFor="impactSummary" className="block text-sm font-medium text-gray-700">
                        Ringkasan Dampak
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="impactSummary"
                          id="impactSummary"
                          rows={4}
                          value={formData.impactSummary}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Jelaskan dampak dari kebijakan ini terhadap masyarakat, ekonomi, atau aspek lainnya"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Liputan Media */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Liputan Media</h2>
                    <div className="space-y-4">
                      {formData.mediaCoverage.map((url, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex-grow">
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-500 flex items-center gap-2"
                            >
                              <NewspaperIcon className="h-5 w-5" />
                              {url}
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMediaCoverage(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <input
                          type="text"
                          name="title"
                          value={newMediaCoverage.title}
                          onChange={handleMediaInputChange}
                          placeholder="Judul liputan"
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          name="url"
                          value={newMediaCoverage.url}
                          onChange={handleMediaInputChange}
                          placeholder="URL liputan"
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <select
                            name="type"
                            value={newMediaCoverage.type}
                            onChange={handleMediaInputChange}
                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="local">Media Nasional</option>
                            <option value="international">Media Internasional</option>
                          </select>
                          <button
                            type="button"
                            onClick={addMediaCoverage}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <PlusIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Semua field dengan tanda * wajib diisi
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/kebijakan"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                    >
                      Batal
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg ${
                        loading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Mengirim...
                        </>
                      ) : (
                        'Kirim Kebijakan'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
} 