'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { getPolicyById } from '@/services/policyService';
import { Policy } from '@/types/policy';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';
import { BookmarkSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export default function BookmarkPage() {
  const [bookmarkedPolicies, setBookmarkedPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarkedPolicies();
  }, []);

  const loadBookmarkedPolicies = async () => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPolicies') || '[]');
      const policies = await Promise.all(
        bookmarks.map((id: string) => getPolicyById(id))
      );
      setBookmarkedPolicies(policies.filter((policy): policy is Policy => policy !== null));
    } catch (error) {
      console.error('Error loading bookmarked policies:', error);
      toast.error('Gagal memuat kebijakan yang di-bookmark');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = (policyId: string) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPolicies') || '[]');
    const newBookmarks = bookmarks.filter((id: string) => id !== policyId);
    localStorage.setItem('bookmarkedPolicies', JSON.stringify(newBookmarks));
    setBookmarkedPolicies(prev => prev.filter(policy => policy.id !== policyId));
    toast.success('Kebijakan dihapus dari bookmark');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Kebijakan yang Di-bookmark</h1>
            <Link
              href="/kebijakan"
              className="text-primary-600 hover:text-primary-500"
            >
              Lihat Semua Kebijakan →
            </Link>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white shadow rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="mt-4 h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : bookmarkedPolicies.length === 0 ? (
            <div className="text-center py-12">
              <BookmarkSolidIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada kebijakan yang di-bookmark</h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai bookmark kebijakan yang ingin Anda simpan untuk referensi nanti.
              </p>
              <div className="mt-6">
                <Link
                  href="/kebijakan"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Jelajahi Kebijakan
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedPolicies.map((policy) => (
                <div key={policy.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/kebijakan/${policy.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-primary-600"
                      >
                        {policy.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {policy.agency} • {format(policy.createdAt, 'd MMMM yyyy', { locale: id })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(policy.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <BookmarkSolidIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {policy.impactSummary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 