'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { getPolicies } from '@/services/policyService';
import { Policy, PolicyFilters } from '@/types/policy';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import PolicyFilterForm from '@/components/PolicyFilters';
import ExportButton from '@/components/ExportButton';
import SearchBar from '@/components/SearchBar';
import toast from 'react-hot-toast';

export default function PolicyListPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PolicyFilters>({ status: 'active' });
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPolicies();
  }, [filters]);

  const loadPolicies = async (loadMore = false) => {
    try {
      const { policies: newPolicies, lastVisible } = await getPolicies(
        filters,
        loadMore ? lastDoc : undefined
      );

      if (loadMore) {
        setPolicies(prev => [...prev, ...newPolicies]);
      } else {
        setPolicies(newPolicies);
      }

      setLastDoc(lastVisible);
      setHasMore(newPolicies.length === 10);
    } catch (error) {
      toast.error('Gagal memuat data kebijakan');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadPolicies(true);
  };

  const handleFilterChange = (newFilters: PolicyFilters) => {
    setFilters(newFilters);
    setLastDoc(null);
    setHasMore(true);
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setLastDoc(null);
    setHasMore(true);
  };

  if (loading && policies.length === 0) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Daftar Kebijakan</h1>
            <ExportButton policies={policies} isLoading={loading} />
          </div>
          
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          <PolicyFilterForm filters={filters} onFilterChange={handleFilterChange} />

          {policies.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada kebijakan</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filters.searchQuery 
                  ? 'Tidak ada kebijakan yang sesuai dengan pencarian Anda.'
                  : 'Belum ada kebijakan yang tersedia.'}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {policy.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {policy.agency} • {format(policy.createdAt, 'd MMMM yyyy', { locale: id })}
                      </p>
                    </div>
                    <a
                      href={policy.officialDocumentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      Lihat Dokumen
                    </a>
                  </div>
                  <p className="mt-4 text-gray-600">{policy.impactSummary}</p>
                  {policy.mediaCoverage.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Liputan Media:</h4>
                      <ul className="mt-2 space-y-1">
                        {policy.mediaCoverage.map((coverage, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {coverage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    className="btn-secondary"
                    disabled={loading}
                  >
                    {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 