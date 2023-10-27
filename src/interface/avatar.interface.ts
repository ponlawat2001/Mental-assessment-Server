import { Timestamp } from 'firebase-admin/firestore';

export interface Avatar {
  id: string;
  email: string;
  avatar: string;
  update_at: Timestamp;
  create_at: Timestamp;
}
