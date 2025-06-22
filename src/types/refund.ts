export type RefundStatus = 'Requested' | 'Processing' | 'Refunded';

export interface Refund {
  appointmentId: string;
  reason: string;
  amount: number;
  status: RefundStatus;
  timeline: {
    requested: string;
    processing?: string;
    refunded?: string;
  };
}
