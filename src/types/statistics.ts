export interface PolicyStatistics {
  totalPolicies: number;
  activePolicies: number;
  inactivePolicies: number;
  agencyDistribution: {
    agency: string;
    count: number;
    percentage: number;
  }[];
  recentPolicies: {
    date: string;
    count: number;
  }[];
} 