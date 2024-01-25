import { Timestamp } from 'firebase-admin/firestore';

export interface Adminusers {
  id: string;
  email: string;
  create_at: Timestamp;
  update_at: Timestamp;
}
