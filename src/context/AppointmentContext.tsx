import React, {createContext, useContext, useState, ReactNode} from 'react';
import {dummyAppointments} from '../data/dummyAppointments';
import {Appointment} from '../types';

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
  rescheduleAppointment: () => void;
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
    useState<Appointment | null>(dummyAppointments[0]);

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

  const rescheduleAppointment = () => {
    setAppointments(prev =>
      prev.map(a => (a.id === currentAppointment?.id ? currentAppointment : a)),
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
