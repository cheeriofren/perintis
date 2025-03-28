import { Timestamp } from 'firebase/firestore';

export type VerificationStatus = 'submitted' | 'in_review' | 'verified' | 'needs_confirmation';

export interface MediaCoverage {
  title: string;
  source: string;
  url: string;
  date: string;
  type: 'national' | 'international';
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
}

export interface Expert {
  name: string;
  title: string;
  specialization: string;
  avatar: string;
}

export interface ExpertReview {
  id: string;
  expertName: string;
  expertise: string;
  institution: string;
  review: string;
  rating: number;
  date: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface TimelineEvent {
  date: string;
  event: string;
  type: 'DRAFT_RELEASED' | 'EXPERT_REVIEW' | 'EFFECTIVE' | 'EXPIRED' | 'AMENDED';
}

export interface PolicyImpact {
  category: string;
  description: string;
  metrics: {
    name: string;
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  visualization?: {
    type: 'chart' | 'map' | 'timeline';
    data: any;
  };
}

export interface PolicyDiscussion {
  id: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
  likes: number;
  replies: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  aiAnalysis?: {
    relevance: number;
    keyPoints: string[];
    sentiment: string;
  };
}

export type PolicyStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export interface PolicyImpactMetrics {
  economic: number;
  social: number;
  environmental: number;
  political: number;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  content: string;
  status: PolicyStatus;
  category: string;
  categories: string[];
  summary: string;
  impactMetrics: PolicyImpactMetrics;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  effectiveDate: Timestamp;
  expiryDate?: Timestamp;
  agency: string;
  documentUrl?: string;
  mediaCoverage: {
    source: string;
    title: string;
    url: string;
    date: Timestamp;
    type: 'national' | 'international' | 'local';
  }[];
  expertReviews: {
    expertName: string;
    organization: string;
    review: string;
    date: Timestamp;
    rating: number;
  }[];
  publicComments: {
    userId: string;
    userName: string;
    comment: string;
    date: Timestamp;
    likes: number;
  }[];
  relatedPolicies: string[];
  tags: string[];
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  version: number;
  lastModifiedBy: string;
  lastModifiedAt: Timestamp;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  blockchainHash?: string;
  ipfsCid?: string;
  filecoinDealId?: string;
}

export interface PolicySubmission {
  title: string;
  agency: string;
  documentUrl: string;
  impactSummary: string;
  mediaCoverage?: MediaCoverage[];
}

export interface PolicyFilters {
  status?: 'active' | 'inactive';
  searchQuery?: string;
  agency?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
} 