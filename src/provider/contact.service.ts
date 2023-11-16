import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';
import { Contact, Contactresult } from '@interface/contact.interface';

@Injectable()
class ContactService {
  private readonly contact: Contact[] = [];
  private contactresult: Contactresult = {
    message: '',
    result: null,
  };

  async findAll(): Promise<any> {
    const db = getFirestore();
    const NewsRef = db.collection('Contact');
    const doc = await NewsRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.contact.length = 0;
      doc.docs.map((element) => {
        this.contact.push({
          id: element.id,
          name_contact: element.data().name_contact,
          image_contact: element.data().image_contact,
          location_contact: element.data().location_contact,
          email_contact: element.data().email_contact,
          facebook_contact: element.data().facebook_contact,
          line_contact: element.data().line_contact,
          phone_contact: element.data().phone_contact,
          update_at: element.data().update_at,
        });
        this.contactresult.message = 'Ok';
        this.contactresult.result = this.contact;
      });
    }
    return this.contactresult;
  }

  async update(body: Contact, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Contact')
      .doc(id)
      .update({
        name_contact: body.name_contact,
        location_contact: body.location_contact,
        image_contact: body.image_contact,
        email_contact: body.email_contact,
        line_contact: body.line_contact,
        facebook_contact: body.facebook_contact,
        phone_contact: body.phone_contact,
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.contactresult.message = 'Successfully Updated';
        this.contactresult.result = [];
      })
      .catch((error) => {
        this.contactresult.message = error.code;
        this.contactresult.result = [];
      });
    return this.contactresult;
  }
}

export default ContactService;
