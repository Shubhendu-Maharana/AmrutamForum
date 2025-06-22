export interface RescheduleRequest {
  reason: string;
  isOther: boolean;
  otherReasonText?: string;
  newDate: string;
  newTime: string;
}
