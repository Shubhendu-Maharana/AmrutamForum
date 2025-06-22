export interface User {
  id: string;
  name: string;
  phone: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  height?: number; // in cm
  weight?: number; // in kg
  profileCompletion?: number; // %
}
