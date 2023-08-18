import { Timestamp } from '@google-cloud/firestore';

export class Newsinterface {
  static collectionName = 'News';

  news_ID: string;
  imgae_URL: string;
  news_content: string;
  create_at: Timestamp;
  update_at: Timestamp;
  is_delete: boolean;
}
export interface News {
  news_ID: string;
  imgae_URL: string;
  news_content: string;
  create_at: Timestamp;
  update_at: Timestamp;
  is_delete: boolean;
}
