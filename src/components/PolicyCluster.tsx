import { Policy } from '@/types/policy';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PolicyClusterProps {
  policies: Policy[];
}

export default function PolicyCluster({ policies }: PolicyClusterProps) {
  // Hitung jumlah kebijakan per kategori
  const categoryCounts = policies.reduce((acc, policy) => {
    const category = policy.category || 'Lainnya';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Data untuk pie chart
  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6', // purple
          '#EC4899', // pink
          '#14B8A6', // teal
          '#F97316', // orange
        ],
      },
    ],
  };

  // Konfigurasi chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Distribusi Kebijakan per Kategori',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Kluster Kebijakan
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80">
          <Pie data={chartData} options={options} />
        </div>

        {/* Kategori List */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Daftar Kategori</h4>
          <div className="space-y-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div
                key={category}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-900">
                  {category}
                </span>
                <span className="text-sm text-gray-500">
                  {count} kebijakan
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistik Tambahan */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm font-medium text-blue-900">
            {policies.length}
          </div>
          <div className="text-xs text-blue-700">Total Kebijakan</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm font-medium text-green-900">
            {policies.filter(p => p.status === 'ACTIVE').length}
          </div>
          <div className="text-xs text-green-700">Kebijakan Aktif</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm font-medium text-yellow-900">
            {policies.filter(p => p.status === 'DRAFT').length}
          </div>
          <div className="text-xs text-yellow-700">Draft</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm font-medium text-red-900">
            {policies.filter(p => p.status === 'ARCHIVED').length}
          </div>
          <div className="text-xs text-red-700">Diarsipkan</div>
        </div>
      </div>
    </div>
  );
} 