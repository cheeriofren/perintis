import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  Timestamp,
  arrayUnion,
} from 'firebase/firestore';
import { db } from './client';
import { Policy, PolicySubmission } from '@/types/policy';

const POLICIES_COLLECTION = 'policies';

export async function submitPolicy(data: PolicySubmission, userId: string): Promise<string> {
  const policyData = {
    ...data,
    timestamp: Timestamp.fromDate(new Date(data.timestamp)),
    tags: data.tags.split(',').map(tag => tag.trim()),
    verificationStatus: 'submitted',
    submittedBy: userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    mediaCoverage: [],
  };

  const docRef = await addDoc(collection(db, POLICIES_COLLECTION), policyData);
  return docRef.id;
}

export async function getPolicies(): Promise<Policy[]> {
  const q = query(
    collection(db, POLICIES_COLLECTION),
    where('verificationStatus', '==', 'verified'),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
    verifiedAt: doc.data().verifiedAt?.toDate(),
  })) as Policy[];
}

export async function getPendingPolicies(): Promise<Policy[]> {
  const q = query(
    collection(db, POLICIES_COLLECTION),
    where('verificationStatus', '==', 'submitted'),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as Policy[];
}

export async function verifyPolicy(
  policyId: string,
  verifierUserId: string,
  status: 'verified' | 'needs_confirmation',
  metadata?: { tags?: string[]; relatedPolicies?: string[] }
): Promise<void> {
  const policyRef = doc(db, POLICIES_COLLECTION, policyId);
  
  await updateDoc(policyRef, {
    verificationStatus: status,
    verifiedBy: verifierUserId,
    verifiedAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    ...(metadata || {}),
  });
}

export async function addMediaCoverage(
  policyId: string,
  mediaCoverage: {
    title: string;
    url: string;
    source: string;
    type: 'local' | 'international';
    publishedAt: Date;
  }
): Promise<void> {
  const policyRef = doc(db, POLICIES_COLLECTION, policyId);
  
  await updateDoc(policyRef, {
    mediaCoverage: arrayUnion({
      ...mediaCoverage,
      publishedAt: Timestamp.fromDate(mediaCoverage.publishedAt),
    }),
    updatedAt: Timestamp.now(),
  });
} 