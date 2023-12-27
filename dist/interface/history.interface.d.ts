import { Timestamp } from 'firebase-admin/firestore';
export interface History {
    id: string;
    type: string;
    owner: string;
    summary: summary[];
    create_at: Timestamp;
}
export interface summary {
    name: string;
    useranswer: Useranswer[];
    scorerate: Scorerate[];
    totalscore: number;
    advise: string;
}
export interface Scorerate {
    name: string;
    rate: string;
}
export interface Useranswer {
    question: string;
    answer: string;
    score: number;
}
