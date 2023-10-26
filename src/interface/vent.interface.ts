import { Timestamp } from 'firebase-admin/firestore';
import { Users } from './users.interface';

export interface Vent {
  id: string;
  vent_content: string;
  owner: Users;
  create_at: Timestamp;
  update_at: Timestamp;
  is_delete: string;
}

export interface Ventresultcount {
  message: string;
  count: number;
  result: any;
}

export interface Ventresult {
  message: string;
  result: any;
}
