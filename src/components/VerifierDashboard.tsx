import { useState, useEffect } from 'react';
import { Policy } from '@/types/policy';
import { getPendingPolicies, verifyPolicy } from '@/lib/firebase/firestore';
import { getCurrentUser } from '@/lib/firebase/auth';
import { HiCheck, HiX, HiExclamationCircle } from 'react-icons/hi';

export default function VerifierDashboard() {
  const [pendingPolicies, setPendingPolicies] = useState<Policy[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationNote, setVerificationNote] = useState('');
  const [additionalTags, setAdditionalTags] = useState('');

  useEffect(() => {
    loadPendingPolicies();
  }, []);

  async function loadPendingPolicies() {
    try {
      const policies = await getPendingPolicies();
      setPendingPolicies(policies);
    } catch (error) {
      console.error('Error loading pending policies:', error);
    }
  }

  async function handleVerification(status: 'verified' | 'needs_confirmation') {
    if (!selectedPolicy || !getCurrentUser()) return;

    try {
      setIsVerifying(true);
      await verifyPolicy(
        selectedPolicy.id,
        getCurrentUser()!.uid,
        status,
        {
          tags: [...selectedPolicy.tags, ...additionalTags.split(',').map(tag => tag.trim())].filter(Boolean),
        }
      );
      
      setSelectedPolicy(null);
      setVerificationNote('');
      setAdditionalTags('');
      await loadPendingPolicies();
    } catch (error) {
      console.error('Error verifying policy:', error);
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        {/* Pending Policies List */}
        <div className="col-span-1 bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Kebijakan Menunggu Verifikasi
            </h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
            {pendingPolicies.map((policy) => (
              <li
                key={policy.id}
                className={`px-4 py-4 cursor-pointer hover:bg-gray-50 ${
                  selectedPolicy?.id === policy.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{policy.title}</p>
                    <p className="text-sm text-gray-500">{policy.agency}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Menunggu
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Verification Form */}
        {selectedPolicy && (
          <div className="col-span-2 bg-white rounded-lg shadow mt-5 md:mt-0">
            <div className="px-4 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Detail Kebijakan
              </h3>
            </div>
            <div className="px-4 py-5">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Judul</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedPolicy.title}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Instansi</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedPolicy.agency}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tanggal</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(selectedPolicy.timestamp).toLocaleDateString('id-ID')}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Ringkasan Dampak</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedPolicy.impactSummary}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Dokumen Resmi</dt>
                  <dd className="mt-1 text-sm text-primary-600">
                    <a href={selectedPolicy.officialDocument.url} target="_blank" rel="noopener noreferrer">
                      Lihat Dokumen
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <label htmlFor="verificationNote" className="block text-sm font-medium text-gray-700">
                  Catatan Verifikasi
                </label>
                <textarea
                  id="verificationNote"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={verificationNote}
                  onChange={(e) => setVerificationNote(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="additionalTags" className="block text-sm font-medium text-gray-700">
                  Tag Tambahan (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  id="additionalTags"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={additionalTags}
                  onChange={(e) => setAdditionalTags(e.target.value)}
                />
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => handleVerification('verified')}
                  disabled={isVerifying}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <HiCheck className="-ml-1 mr-2 h-5 w-5" />
                  Verifikasi
                </button>
                <button
                  type="button"
                  onClick={() => handleVerification('needs_confirmation')}
                  disabled={isVerifying}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <HiExclamationCircle className="-ml-1 mr-2 h-5 w-5" />
                  Butuh Konfirmasi
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPolicy(null)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <HiX className="-ml-1 mr-2 h-5 w-5" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 