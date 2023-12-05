import { Timestamp } from 'firebase-admin/firestore';

export interface Assessment {
  id: string;
  name: string;
  description: string;
  questionnaire: Map<string, boolean>;
  answer: Map<string, number>;
  scorerate: Map<string, Map<string, number>>;
  advise: Map<string, string>;
  update_at: Timestamp;
  create_at: Timestamp;
  is_delete: boolean;
}
