export interface Wallet {
  userId: string;
  balance: number;
  transactions: {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    date: string;
    description: string;
  }[];
}
