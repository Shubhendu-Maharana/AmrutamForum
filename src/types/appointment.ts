export interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  date: string;
  time: string;
  doctorImage: string;
}
