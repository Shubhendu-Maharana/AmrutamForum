import React, {createContext, useContext, useState, ReactNode} from 'react';
import {dummyAppointments} from '../data/dummyAppointments';

// Define type
export interface Appointment {
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

// Create context type
interface AppointmentContextType {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  currentAppointment: Appointment | null;
  setCurrentAppointment: React.Dispatch<
    React.SetStateAction<Appointment | null>
  >;
  getAppointmentById: (id: string) => Appointment | undefined;
  cancelAppointment: (reason: string, returnAmount: string) => void;
  rescheduleAppointment: (
    date?: string,
    time?: string,
    reason?: string,
  ) => void;
}

// Create context
const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

// Provider
export const AppointmentProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(dummyAppointments);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);

  const getAppointmentById = (id: string) =>
    appointments.find(a => a.id === id);

  const cancelAppointment = (reason: string, returnAmount: string) => {
    // Update the status of the appointment
    setCurrentAppointment(
      prev =>
        prev && {
          ...prev,
          status: 'Cancelled',
          cancellactionReason: reason,
          returnAmount,
        },
    );
    setAppointments(prev =>
      prev.map(a =>
        a.id === currentAppointment?.id
          ? {
              ...a,
              status: 'Cancelled',
              returnAmount,
              cancellactionReason: reason,
            }
          : a,
      ),
    );
  };

  const rescheduleAppointment = (
    date: string,
    time: string,
    reason: string,
  ) => {
    // Update the status of the appointment
    setCurrentAppointment(
      prev =>
        prev && {
          ...prev,
          status: 'Rescheduled',
          date,
          time,
          rescheduleReason: reason,
        },
    );
    setAppointments(prev =>
      prev.map(a =>
        a.id === currentAppointment?.id
          ? {
              ...a,
              status: 'Rescheduled',
              date,
              time,
              rescheduleReason: reason,
            }
          : a,
      ),
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        currentAppointment,
        setCurrentAppointment,
        getAppointmentById,
        cancelAppointment,
        rescheduleAppointment,
      }}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook
export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within AppointmentProvider');
  }
  return context;
};
