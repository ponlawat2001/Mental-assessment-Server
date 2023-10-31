import { Timestamp } from 'firebase-admin/firestore';

export interface VentChoice {
  id: string;
  choice: string;
  create_at: Timestamp;
  update_at: Timestamp;
}
