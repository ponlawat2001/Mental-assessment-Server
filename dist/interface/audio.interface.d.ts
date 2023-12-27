import { Timestamp } from 'firebase-admin/firestore';
export interface Audio {
    id: string;
    owner: string;
    audioUrl: string;
    update_at: Timestamp;
    create_at: Timestamp;
    is_delete: boolean;
}
