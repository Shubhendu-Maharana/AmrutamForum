export interface Doctor {
  id: string;
  name: string;
  specialties: string[]; // e.g., ['Gynecology', 'Infertility']
  feePerMinute: number;
  avatarUrl?: string;
}
