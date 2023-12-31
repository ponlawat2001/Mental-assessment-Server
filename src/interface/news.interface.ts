import { Timestamp } from 'firebase-admin/firestore';

export interface News {
  id: string;
  title: string;
  intro: string;
  image_URL: string;
  news_content: string;
  create_at: Timestamp;
  update_at: Timestamp;
  is_delete: boolean;
}

export interface Newsresultcount {
  message: string;
  count: number;
  result: any;
}

export interface Newsresult {
  message: string;
  result: any;
}
