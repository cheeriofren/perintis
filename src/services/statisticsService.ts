import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PolicyStatistics } from '@/types/statistics';
import { format, subDays } from 'date-fns';
import { id } from 'date-fns/locale';
import { Policy } from '@/types/policy';

const COLLECTION_NAME = 'policies';

export async function getPolicyStatistics(): Promise<PolicyStatistics> {
  try {
    const policiesSnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const policies = policiesSnapshot.docs.map(doc => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      status: doc.data().status,
      agency: doc.data().agency
    })) as Policy[];

    // Hitung total dan status
    const totalPolicies = policies.length;
    const activePolicies = policies.filter(p => p.status === 'active').length;
    const inactivePolicies = policies.filter(p => p.status === 'inactive').length;

    // Hitung distribusi instansi
    const agencyCounts = policies.reduce((acc: { [key: string]: number }, policy) => {
      acc[policy.agency] = (acc[policy.agency] || 0) + 1;
      return acc;
    }, {});

    const agencyDistribution = Object.entries(agencyCounts)
      .map(([agency, count]) => ({
        agency,
        count,
        percentage: (count / totalPolicies) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Ambil 5 instansi teratas

    // Hitung kebijakan terbaru (7 hari terakhir)
    const recentPolicies = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      const count = policies.filter(p => 
        format(p.createdAt, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      ).length;
      return {
        date: format(date, 'd MMM', { locale: id }),
        count
      };
    }).reverse();

    return {
      totalPolicies,
      activePolicies,
      inactivePolicies,
      agencyDistribution,
      recentPolicies
    };
  } catch (error) {
    console.error('Error fetching policy statistics:', error);
    throw error;
  }
} 