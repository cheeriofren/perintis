import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  Timestamp,
  QueryConstraint,
  startAfter,
  Query,
  getDocsFromCache
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Policy, PolicySubmission, PolicyFilters, MediaCoverage } from '@/types/policy';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';

const COLLECTION_NAME = 'policies';
const POLICIES_PER_PAGE = 10;

// Helper function untuk konversi data
const convertTimestampsToDates = (data: any) => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    verifiedAt: data.verifiedAt?.toDate() || null
  };
};

// Helper function untuk konversi media coverage
const convertMediaCoverage = (coverage: any[]): MediaCoverage[] => {
  if (!Array.isArray(coverage)) return [];
  
  return coverage.map(item => {
    if (typeof item === 'string') {
      return {
        title: item,
        url: item,
        type: item.includes('international') ? 'international' : 'local'
      };
    }
    return item as MediaCoverage;
  });
};

export async function getPolicies(filters: PolicyFilters = {}, lastDoc?: any) {
  try {
    console.log('Fetching policies with filters:', filters);
    
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(POLICIES_PER_PAGE)
    );

    console.log('Executing query...');
    const querySnapshot = await getDocs(q);
    console.log('Got query snapshot, docs count:', querySnapshot.docs.length);

    const policies = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Processing doc:', doc.id, data);
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        mediaCoverage: data.mediaCoverage || []
      };
    }) as Policy[];

    console.log('Processed policies:', policies);
    return { 
      policies,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1]
    };
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw new Error('Gagal mengambil data kebijakan');
  }
}

export async function getPolicyById(id: string): Promise<Policy | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...convertTimestampsToDates(data),
      mediaCoverage: convertMediaCoverage(data.mediaCoverage || [])
    } as Policy;
  } catch (error) {
    console.error('Error fetching policy:', error);
    throw new Error('Gagal mengambil detail kebijakan');
  }
}

export async function submitPolicy(policy: Omit<Policy, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...policy,
      status: 'inactive',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      mediaCoverage: Array.isArray(policy.mediaCoverage) ? policy.mediaCoverage : []
    });

    // Kirim notifikasi ke admin menggunakan Cloud Function
    const sendNotification = httpsCallable(functions, 'sendNotification');
    try {
      await sendNotification({
        title: 'Pengajuan Kebijakan Baru',
        body: `${policy.title} dari ${policy.agency} membutuhkan verifikasi`,
        data: {
          policyId: docRef.id,
          type: 'new_submission'
        }
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }

    return docRef.id;
  } catch (error) {
    console.error('Error submitting policy:', error);
    throw new Error('Gagal mengirim kebijakan baru');
  }
}

export async function updatePolicy(id: string, data: Partial<Policy>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
      mediaCoverage: Array.isArray(data.mediaCoverage) ? data.mediaCoverage : []
    });
  } catch (error) {
    console.error('Error updating policy:', error);
    throw new Error('Gagal memperbarui kebijakan');
  }
}

export async function verifyPolicy(policyId: string, verifiedBy: string) {
  try {
    const policyRef = doc(db, COLLECTION_NAME, policyId);
    await updateDoc(policyRef, {
      status: 'active',
      verifiedBy,
      verifiedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error verifying policy:', error);
    throw new Error('Gagal memverifikasi kebijakan');
  }
} 