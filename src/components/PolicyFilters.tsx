import { PolicyFilters as PolicyFiltersType } from '@/types/policy';

interface PolicyFilterFormProps {
  filters: PolicyFiltersType;
  onFilterChange: (filters: PolicyFiltersType) => void;
}

export default function PolicyFilterForm({ filters, onFilterChange }: PolicyFilterFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value || undefined
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="agency" className="label">
            Instansi
          </label>
          <select
            id="agency"
            name="agency"
            value={filters.agency || ''}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Semua Instansi</option>
            <option value="kemenkeu">Kementerian Keuangan</option>
            <option value="kemenperin">Kementerian Perindustrian</option>
            <option value="kemenperdag">Kementerian Perdagangan</option>
          </select>
        </div>
        <div>
          <label htmlFor="year" className="label">
            Tahun
          </label>
          <select
            id="year"
            name="year"
            value={filters.year || ''}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Semua Tahun</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div>
          <label htmlFor="search" className="label">
            Cari
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            className="input-field"
            placeholder="Cari kebijakan..."
          />
        </div>
      </div>
    </div>
  );
} 