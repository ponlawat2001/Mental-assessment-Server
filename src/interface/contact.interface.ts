import { Timestamp } from 'firebase-admin/firestore';

export interface Contact {
  id: String;
  email_contact: String;
  facebook_contact: String;
  line_contact: String;
  phone_contact: String;
  location_contact: String;
  name_contact: String;
  image_contact: String;
  update_at: Timestamp;
}

export interface Contactresult {
  message: string;
  result: any;
}
