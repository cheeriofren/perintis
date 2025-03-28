import { Timestamp } from 'firebase/firestore';

export const timestampToDate = (timestamp: Timestamp | undefined): Date | undefined => {
  if (!timestamp) return undefined;
  return timestamp.toDate();
}; 