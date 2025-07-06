export type KeyValue = {
  label: string;
  value: string;
};

export type Appointment = {
  id: string;
  doctorName: string;
  specialization: string;
  status: string;
  dateTime: string;
  doctorImage: string;
  rescheduleReason?: string;
  basicInfo: {
    gender: string;
    age: string;
    height: string;
    weight: string;
  };
  appointmentDetails: KeyValue[];
  symptomDetails: KeyValue[];
  couponDetails: KeyValue[];
  bookingDetails: KeyValue[];
};
