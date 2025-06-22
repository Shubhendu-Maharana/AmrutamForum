export interface SymptomDetails {
  concern: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  duration: {
    value: number;
    unit: 'Days' | 'Weeks' | 'Months' | 'Years';
  };
}
