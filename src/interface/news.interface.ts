import { Timestamp } from '@google-cloud/firestore';

export interface News {
  id: string;
  image_URL: string;
  news_content: string;
  create_at: Timestamp;
  update_at: Timestamp;
  is_delete: boolean;
}
