'use client';

import { useEffect, useState } from 'react';
import { getPolicyStatistics } from '@/services/statisticsService';
import { PolicyStatistics } from '@/types/statistics';
import { ChartBarIcon, DocumentCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function StatisticsCard() {
  const [statistics, setStatistics] = useState<PolicyStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const data = await getPolicyStatistics();
      setStatistics(data);
    } catch (error) {
      toast.error('Gagal memuat statistik');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-6 w-6 text-primary-600" />
            <h3 className="ml-2 text-sm font-medium text-gray-500">Total Kebijakan</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {statistics.totalPolicies}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DocumentCheckIcon className="h-6 w-6 text-green-600" />
            <h3 className="ml-2 text-sm font-medium text-gray-500">Kebijakan Aktif</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {statistics.activePolicies}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            <h3 className="ml-2 text-sm font-medium text-gray-500">Menunggu Verifikasi</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {statistics.inactivePolicies}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribusi Instansi</h3>
          <div className="space-y-4">
            {statistics.agencyDistribution.map((item) => (
              <div key={item.agency}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.agency}</span>
                  <span className="text-gray-900 font-medium">{item.count}</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Kebijakan Terbaru</h3>
          <div className="space-y-4">
            {statistics.recentPolicies.map((item) => (
              <div key={item.date} className="flex justify-between items-center">
                <span className="text-gray-600">{item.date}</span>
                <span className="text-gray-900 font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 