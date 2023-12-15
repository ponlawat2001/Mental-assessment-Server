import { Timestamp } from 'firebase-admin/firestore';

export interface Assessment {
  id: string;
  name: string;
  description: string;
  type: string;
  questionnaire: Questionnaire;
  answer: Answer[];
  scorerate: Scorerate[];
  advise: Advise[];
  update_at: Timestamp;
  create_at: Timestamp;
  is_delete: boolean;
}

export interface Advise {
  name: string;
  advise: string;
  rate: number;
}

export interface Answer {
  name: string;
  score: number;
}

export interface Questionnaire {
  question: string[];
  reversescore: boolean[];
}

export interface Scorerate {
  name: string;
  questionnairenumber: number[];
  rate: Answer[];
}
