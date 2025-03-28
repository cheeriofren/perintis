'use client';

import Layout from '@/components/layout/Layout';
import PolicyForm from '@/components/PolicyForm';
import { PolicySubmission } from '@/types/policy';
import { submitPolicy } from '@/services/policyService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SubmitPage() {
  const router = useRouter();

  const handleSubmit = async (data: PolicySubmission) => {
    try {
      await submitPolicy(data);
      toast.success('Kebijakan berhasil dikirim!');
      router.push('/kebijakan');
    } catch (error) {
      toast.error('Terjadi kesalahan saat mengirim kebijakan');
      throw error;
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kirim Kebijakan Baru</h1>
          <p className="mt-2 text-sm text-gray-600">
            Bantu kami melacak kebijakan publik di Indonesia dengan mengirimkan informasi kebijakan baru.
          </p>
        </div>

        <PolicyForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
} 