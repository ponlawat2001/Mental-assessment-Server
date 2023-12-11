import { Timestamp } from 'firebase-admin/firestore';

export interface History {
  id: string;
  name: string;
  type: string;
  owner: string;
  useranswer: Useranswer[];
  scorerate: Scorerate[];
  totalscore: number;
  totalrate: string;
  advise: string;
  create_at: Timestamp;
}

export interface Scorerate {
  name: string;
  rate: string;
}

export interface Useranswer {
  question: string;
  score: number;
}
