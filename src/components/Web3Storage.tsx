import { useState } from 'react';
import { Policy } from '@/types/policy';
import { CloudArrowUpIcon, CloudArrowDownIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Web3StorageService, Web3StorageResult } from '@/services/web3Storage';

interface Web3StorageProps {
  policy: Policy;
}

export default function Web3Storage({ policy }: Web3StorageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [storageResult, setStorageResult] = useState<Web3StorageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadToIPFS = async () => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      // Simulasi progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Upload ke IPFS dan Filecoin
      const result = await Web3StorageService.uploadPolicy(policy);
      setStorageResult(result);
      setUploadProgress(100);

      clearInterval(progressInterval);
      console.log('File uploaded successfully:', result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Gagal mengunggah dokumen');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadFromIPFS = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setError(null);

      if (!storageResult?.cid) {
        throw new Error('CID tidak ditemukan');
      }

      // Simulasi progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Download dari IPFS
      const policy = await Web3StorageService.downloadPolicy(storageResult.cid);
      console.log('File downloaded successfully:', policy);
      setDownloadProgress(100);

      clearInterval(progressInterval);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Gagal mengunduh dokumen');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShieldCheckIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Penyimpanan Web3
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* IPFS Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Status IPFS</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              storageResult ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {storageResult ? 'Terhubung' : 'Belum Terhubung'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            CID: {storageResult?.cid || 'Belum ada CID'}
          </div>
        </div>

        {/* Filecoin Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Status Filecoin</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              storageResult?.dealId ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {storageResult?.dealId ? 'Tersimpan' : 'Belum Tersimpan'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Deal ID: {storageResult?.dealId || 'Belum ada Deal ID'}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Mengunggah ke IPFS</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Download Progress */}
        {isDownloading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Mengunduh dari IPFS</span>
              <span className="text-sm text-gray-500">{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={uploadToIPFS}
            disabled={isUploading}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isUploading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <CloudArrowUpIcon className="w-5 h-5 mr-2" />
            {isUploading ? 'Mengunggah...' : 'Unggah ke IPFS'}
          </button>
          <button
            onClick={downloadFromIPFS}
            disabled={isDownloading || !storageResult?.cid}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDownloading || !storageResult?.cid
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            <CloudArrowDownIcon className="w-5 h-5 mr-2" />
            {isDownloading ? 'Mengunduh...' : 'Unduh dari IPFS'}
          </button>
        </div>

        {/* Storage Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                Informasi Penyimpanan
              </h4>
              <p className="text-sm text-blue-700">
                Dokumen ini tersimpan di jaringan IPFS dan Filecoin untuk keamanan dan ketersediaan maksimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 