import { Timestamp } from 'firebase-admin/firestore';

export interface Avatar {
  id: string;
  email: string;
  avatar: string;
  favorite: boolean;
  update_at: Timestamp;
  create_at: Timestamp;
}
