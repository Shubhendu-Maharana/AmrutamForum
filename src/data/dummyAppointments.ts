export interface AppointmentCardItem {
  id: string;
  doctorName: string;
  specialization: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Rescheduled';
  date: string;
  time: string;
  doctorImage: string;
  cancellactionReason?: string;
  returnAmount?: string;
  rescheduleReason?: string;
}

export const dummyAppointments: AppointmentCardItem[] = [
  {
    id: 'apt-001',
    doctorName: 'Deepa Godara',
    specialization: 'Orthodontist',
    status: 'Upcoming',
    date: 'Sunday, 22/06/2025',
    time: '11:50 PM',
    doctorImage: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'apt-002',
    doctorName: 'Rajat Ahuja',
    specialization: 'Ayurvedic Specialist',
    status: 'Completed',
    date: 'Friday, 08/09/2023',
    time: '05:00 PM',
    doctorImage: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 'apt-003',
    doctorName: 'Rohini Mehra',
    specialization: 'Dermatologist',
    status: 'Cancelled',
    date: 'Monday, 18/09/2023',
    time: '09:15 AM',
    doctorImage: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'apt-004',
    doctorName: 'Rohini Mehra',
    specialization: 'Dermatologist',
    status: 'Cancelled',
    date: 'Monday, 18/09/2023',
    time: '09:15 AM',
    doctorImage: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'apt-005',
    doctorName: 'Rohini Mehra',
    specialization: 'Dermatologist',
    status: 'Cancelled',
    date: 'Monday, 18/09/2023',
    time: '09:15 AM',
    doctorImage: 'https://i.pravatar.cc/150?img=3',
  },
];
