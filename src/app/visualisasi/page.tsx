import { Metadata } from 'next';
import PolicyTimeline from '@/components/PolicyTimeline';
import PolicyCluster from '@/components/PolicyCluster';
import { getPolicies } from '@/services/policyService';

export const metadata: Metadata = {
  title: 'Visualisasi Kebijakan | Perintis',
  description: 'Visualisasi dan analisis kebijakan pemerintah',
};

export default async function VisualizationPage() {
  const policies = await getPolicies();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Visualisasi Kebijakan</h1>
        <p className="mt-2 text-gray-600">
          Analisis dan visualisasi kebijakan pemerintah dalam berbagai perspektif
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timeline Kebijakan */}
        <div className="lg:col-span-2">
          <PolicyTimeline policies={policies} />
        </div>

        {/* Kluster Kebijakan */}
        <div className="lg:col-span-2">
          <PolicyCluster policies={policies} />
        </div>
      </div>
    </div>
  );
} 