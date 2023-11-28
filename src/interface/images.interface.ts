import { Timestamp } from 'firebase-admin/firestore';

export interface Images {
  id: string;
  owner: string;
  imageUrl: string;
  update_at: Timestamp;
  create_at: Timestamp;
}
