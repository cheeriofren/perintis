'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportToCSV } from '@/services/exportService';
import { Policy } from '@/types/policy';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  policies: Policy[];
  isLoading?: boolean;
}

export default function ExportButton({ policies, isLoading = false }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      exportToCSV(policies);
      toast.success('Data berhasil diekspor');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Gagal mengekspor data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading || isExporting || policies.length === 0}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {isExporting ? 'Mengekspor...' : 'Ekspor CSV'}
    </button>
  );
} 