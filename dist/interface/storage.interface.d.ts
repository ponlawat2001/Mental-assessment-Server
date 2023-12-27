import { Timestamp } from 'firebase-admin/firestore';
export interface Storage {
    id: string;
    image_URL: string;
    create_at: Timestamp;
    update_at: Timestamp;
    is_delete: boolean;
}
export interface Storageresult {
    message: string;
    result: any;
}
