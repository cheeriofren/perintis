import { useState, useEffect } from 'react';
import { Policy } from '@/types/policy';
import { ChartBarIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface AIPolicyAnalyzerProps {
  policy: Policy;
}

export default function AIPolicyAnalyzer({ policy }: AIPolicyAnalyzerProps) {
  const [analysis, setAnalysis] = useState<{
    sentiment: number;
    keyTopics: string[];
    riskLevel: number;
    recommendations: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyzePolicy();
  }, [policy]);

  const analyzePolicy = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulasi analisis AI (dalam implementasi nyata, ini akan menggunakan model TensorFlow.js)
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: policy.title,
          description: policy.description,
          impactSummary: policy.impactSummary,
          mediaCoverage: policy.mediaCoverage,
          expertReviews: policy.expertReviews,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menganalisis kebijakan');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Analisis AI Kebijakan
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2" />
            <h4 className="font-medium text-blue-900">Sentimen Publik</h4>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {analysis.sentiment > 0.7 ? 'Sangat Positif' : analysis.sentiment > 0.4 ? 'Positif' : 'Netral'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.round(analysis.sentiment * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${analysis.sentiment * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Key Topics */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DocumentTextIcon className="w-5 h-5 text-purple-500 mr-2" />
            <h4 className="font-medium text-purple-900">Topik Utama</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.keyTopics.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <ChartBarIcon className="w-5 h-5 text-amber-500 mr-2" />
            <h4 className="font-medium text-amber-900">Tingkat Risiko</h4>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
                  {analysis.riskLevel > 0.7 ? 'Tinggi' : analysis.riskLevel > 0.4 ? 'Sedang' : 'Rendah'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-amber-600">
                  {Math.round(analysis.riskLevel * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
              <div
                style={{ width: `${analysis.riskLevel * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <UserGroupIcon className="w-5 h-5 text-green-500 mr-2" />
            <h4 className="font-medium text-green-900">Rekomendasi</h4>
          </div>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-green-500">•</span>
                <span className="ml-2 text-sm text-green-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 