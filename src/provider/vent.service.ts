import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { Vent, Ventresult, Ventresultcount } from '@interface/vent.interface';
import { firestore } from 'firebase-admin';
import e from 'express';
@Injectable()
class VentService {
  private vents: Vent[] = [];
  private ventresult: Ventresult = {
    message: '',
    result: null,
  };
  private ventresultcount: Ventresultcount = {
    message: '',
    count: 0,
    result: null,
  };

  private isdelete_check(data: any) {
    return data.is_delete == true ? true : false;
  }

  async findAll(): Promise<any> {
    const db = getFirestore();
    const VentsRef = db.collection('Vent');
    const doc = await VentsRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.vents.length = 0;
      doc.docs.map((element) => {
        if (this.isdelete_check(element.data())) {
          this.ventresult.message = 'Document doesnt exist';
          this.ventresult.result = [];
        } else {
          console.log(element.data());
          this.vents.push({
            id: element.id,
            vent_content: element.data().vent_content,
            owner: element.data().owner,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
            is_delete: element.data().is_delete,
          });
          this.ventresult.message = 'Ok';
          this.ventresult.result = this.vents;
        }
      });
    }
    return this.ventresult;
  }

  async findCount(): Promise<any> {
    const db = getFirestore();
    const VentsRef = db.collection('Vent');
    const doc = await VentsRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.vents.length = 0;
      doc.docs.map((element) => {
        if (this.isdelete_check(element.data())) {
          this.ventresultcount.message = 'Document doesnt exist';
          this.ventresultcount.result = [];
        } else {
          this.vents.push({
            id: element.id,
            vent_content: element.data().vent_content,
            owner: element.data().owner,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
            is_delete: element.data().is_delete,
          });
          this.ventresultcount.message = 'Ok';
          this.ventresultcount.count = this.vents.length;
          this.ventresultcount.result = this.vents;
        }
      });
    }
    return this.ventresultcount;
  }

  async findOne(id: string): Promise<any> {
    const db = getFirestore();
    const VentsRef = db.collection('Vent');
    const ventone = await VentsRef.doc(id).get();
    if (ventone == null || this.isdelete_check(ventone.data())) {
      this.ventresult.message = 'Document doesnt exist';
      this.ventresult.result = [];
    } else {
      this.vents.length = 0;
      this.vents.push({
        id: ventone.id,
        vent_content: ventone.data().vent_content,
        owner: ventone.data().owner,
        create_at: ventone.data().create_at,
        update_at: ventone.data().update_at,
        is_delete: ventone.data().is_delete,
      });
      this.ventresult.message = 'Ok';
      this.ventresult.result = this.vents;
    }

    return this.ventresult;
  }

  async findOwner(email: string) {
    const db = getFirestore();
    const VentsRef = db.collection('Vent');
    const vents = (
      await VentsRef.where('owner', '==', email)
        .where('is_delete', '==', false)
        .get()
    ).docs;
    this.vents.length = 0;
    vents.map((element) => {
      this.vents.push({
        id: element.id,
        vent_content: element.data().vent_content,
        owner: element.data().owner,
        create_at: element.data().create_at,
        update_at: element.data().update_at,
        is_delete: element.data().is_delete,
      });
    });

    this.ventresult.message = 'Ok';
    this.ventresult.result = this.vents;
    return this.ventresult;
  }

  async create(body: Vent): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Vent')
      .add(<Vent>{
        vent_content: body.vent_content,
        owner: body.owner,
        create_at: firestore.Timestamp.now(),
        update_at: firestore.Timestamp.now(),
        is_delete: false,
      })
      .then(() => {
        this.ventresult.message = 'Successfully Created';
        this.ventresult.result = <Vent>{
          vent_content: body.vent_content,
          owner: body.owner,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
          is_delete: false,
        };
      })
      .catch((error) => {
        this.ventresult.message = error.code;
        this.ventresult.result = [];
      });
    return this.ventresult;
  }

  async update(body: Vent, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Vent')
      .doc(id)
      .update({
        vent_content: body.vent_content,
        update_at: firestore.Timestamp.now(),
      })
      .then(async () => {
        const ventone = await db.collection('Vent').doc(id).get();

        this.ventresult.message = 'Successfully Updated';
        this.ventresult.result = {
          id: ventone.id,
          vent_content: ventone.data().vent_content,
          owner: ventone.data().owner,
          create_at: ventone.data().create_at,
          update_at: ventone.data().update_at,
          is_delete: ventone.data().is_delete,
        };
      })
      .catch((error) => {
        this.ventresult.message = error.code;
        this.ventresult.result = [];
      });

    return this.ventresult;
  }

  async delete(id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Vent')
      .doc(id)
      .update({
        is_delete: true,
      })
      .then(() => {
        this.ventresult.message = 'Successfully Deleted';
        this.ventresult.result = [];
      })
      .catch((error) => {
        this.ventresult.message = error.code;
        this.ventresult.result = [];
      });

    return this.ventresult;
  }
}

export default VentService;
