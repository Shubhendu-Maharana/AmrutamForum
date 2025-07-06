export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  feePerMinute: number;
  avatarUrl?: string;
}
