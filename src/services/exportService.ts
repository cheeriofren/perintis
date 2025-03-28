import { Policy } from '@/types/policy';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function exportToCSV(policies: Policy[]) {
  // Header CSV
  const headers = [
    'Judul',
    'Instansi',
    'Link Dokumen',
    'Ringkasan Dampak',
    'Liputan Media',
    'Status',
    'Tanggal Dibuat',
    'Tanggal Diperbarui',
    'Diverifikasi Oleh',
    'Tanggal Verifikasi'
  ];

  // Konversi data ke format CSV
  const rows = policies.map(policy => [
    policy.title,
    policy.agency,
    policy.officialDocumentLink,
    policy.impactSummary,
    policy.mediaCoverage.join('; '),
    policy.status === 'active' ? 'Aktif' : 'Tidak Aktif',
    format(policy.createdAt, 'd MMMM yyyy', { locale: id }),
    format(policy.updatedAt, 'd MMMM yyyy', { locale: id }),
    policy.verifiedBy || '-',
    policy.verifiedAt ? format(policy.verifiedAt, 'd MMMM yyyy', { locale: id }) : '-'
  ]);

  // Gabungkan header dan data
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Buat blob dan download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `kebijakan_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 