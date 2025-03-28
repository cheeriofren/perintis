'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { getPolicies, verifyPolicy } from '@/services/policyService';
import { Policy } from '@/types/policy';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const data = await getPolicies({ status: 'inactive' });
      setPolicies(data);
    } catch (error) {
      toast.error('Gagal memuat data kebijakan');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (policyId: string) => {
    try {
      await verifyPolicy(policyId, 'admin'); // TODO: Get actual user ID
      toast.success('Kebijakan berhasil diverifikasi');
      loadPolicies();
    } catch (error) {
      toast.error('Gagal memverifikasi kebijakan');
    }
  };

  if (loading) {
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
            <h1 className="text-2xl font-bold text-gray-900">Verifikasi Kebijakan</h1>
            <button
              onClick={() => router.push('/kebijakan')}
              className="btn-secondary"
            >
              Lihat Kebijakan Aktif
            </button>
          </div>

          {policies.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada kebijakan yang perlu diverifikasi</h3>
              <p className="mt-1 text-sm text-gray-500">
                Semua kebijakan sudah diverifikasi atau belum ada pengajuan baru.
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {policies.map((policy) => (
                  <li key={policy.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-600 font-medium">
                                {policy.title.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-primary-600 truncate">
                              {policy.title}
                            </h3>
                            <div className="mt-1 text-sm text-gray-500">
                              <p>{policy.agency}</p>
                              <p>Diterbitkan pada {format(policy.createdAt, 'd MMMM yyyy', { locale: id })}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <button
                            onClick={() => handleVerify(policy.id)}
                            className="btn-primary"
                          >
                            Verifikasi
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 