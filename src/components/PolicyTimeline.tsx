import { Policy } from '@/types/policy';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface PolicyTimelineProps {
  policies: Policy[];
}

export default function PolicyTimeline({ policies }: PolicyTimelineProps) {
  // Urutkan kebijakan berdasarkan tanggal efektif
  const sortedPolicies = [...policies].sort((a, b) => {
    const dateA = a.effectiveDate?.toDate() || new Date(0);
    const dateB = b.effectiveDate?.toDate() || new Date(0);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="relative">
      {/* Garis vertikal */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

      <div className="space-y-8">
        {sortedPolicies.map((policy, index) => (
          <div key={policy.id} className="relative">
            {/* Bulat timeline */}
            <div className="absolute left-4 w-2 h-2 bg-blue-500 rounded-full"></div>

            {/* Konten kebijakan */}
            <div className="ml-8 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {policy.title}
                </span>
                <span className="text-xs text-gray-500">
                  {policy.effectiveDate && format(policy.effectiveDate.toDate(), 'd MMMM yyyy', { locale: id })}
                </span>
              </div>

              {/* Status badge */}
              <div className="mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  policy.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : policy.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {policy.status === 'active' ? 'Aktif' : policy.status === 'draft' ? 'Draft' : 'Tidak Aktif'}
                </span>
              </div>

              {/* Kategori tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {policy.categories?.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Ringkasan */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {policy.summary}
              </p>

              {/* Dampak kebijakan */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Dampak Kebijakan</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900">
                      {policy.impactMetrics?.economic || 0}%
                    </div>
                    <div className="text-xs text-gray-500">Dampak Ekonomi</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900">
                      {policy.impactMetrics?.social || 0}%
                    </div>
                    <div className="text-xs text-gray-500">Dampak Sosial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 