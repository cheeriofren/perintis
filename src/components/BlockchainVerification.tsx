import { useState } from 'react';
import { Policy } from '@/types/policy';
import { ShieldCheckIcon, DocumentCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface BlockchainVerificationProps {
  policy: Policy;
}

export default function BlockchainVerification({ policy }: BlockchainVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    timestamp: string;
    hash: string;
  } | null>(null);

  const verifyOnBlockchain = async () => {
    try {
      setIsVerifying(true);
      
      // Simulasi verifikasi blockchain (dalam implementasi nyata, ini akan menggunakan smart contract)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVerificationResult({
        isValid: true,
        timestamp: new Date().toISOString(),
        hash: policy.blockchain?.hash || '0x1234...5678'
      });
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShieldCheckIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Verifikasi Blockchain
          </h3>
        </div>
        <button
          onClick={verifyOnBlockchain}
          disabled={isVerifying}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isVerifying
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isVerifying ? 'Memverifikasi...' : 'Verifikasi Sekarang'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Verification Status */}
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${
            policy.isVerified ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span className="text-sm text-gray-600">
            {policy.isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
          </span>
        </div>

        {/* Blockchain Hash */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DocumentCheckIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Hash Blockchain</span>
          </div>
          <div className="font-mono text-sm text-gray-600 break-all">
            {policy.blockchain?.hash || 'Belum ada hash'}
          </div>
        </div>

        {/* Timestamp */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <ClockIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Waktu Verifikasi</span>
          </div>
          <div className="text-sm text-gray-600">
            {policy.verificationDetails?.verifiedAt
              ? new Date(policy.verificationDetails.verifiedAt.toDate()).toLocaleString('id-ID')
              : 'Belum diverifikasi'}
          </div>
        </div>

        {/* Verification Method */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <ShieldCheckIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Metode Verifikasi</span>
          </div>
          <div className="text-sm text-gray-600 capitalize">
            {policy.verificationDetails?.method || 'Belum diverifikasi'}
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className={`rounded-lg p-4 ${
            verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheckIcon className={`w-5 h-5 mr-2 ${
                  verificationResult.isValid ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-sm font-medium ${
                  verificationResult.isValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {verificationResult.isValid ? 'Verifikasi Berhasil' : 'Verifikasi Gagal'}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(verificationResult.timestamp).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 