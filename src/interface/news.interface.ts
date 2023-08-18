import { Timestamp } from '@google-cloud/firestore';

export interface News {
  news_ID: string;
  image_URL: string;
  news_content: string;
  create_at: Timestamp;
  update_at: Timestamp;
  is_delete: boolean;
}
