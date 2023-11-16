import { Injectable } from '@nestjs/common';
import { VentChoice } from '@interface/vent_choice.interface';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';

@Injectable()
class VentChoiceService {
  private readonly ventchoice: VentChoice[] = [];
  private ventchoiceresultcount = {
    message: '',
    count: 0,
    result: null,
  };
  private ventchoiceresult = {
    message: '',
    result: null,
  };

  async findOne(id: string): Promise<any> {
    const Oneventchoice = async (id: string) => {
      this.ventchoice.length = 0;
      const db = getFirestore();
      const VentsRef = db.collection('VentChoice');
      const ventone = await VentsRef.doc(id).get();
      this.ventchoice.length = 0;
      this.ventchoice.push({
        id: ventone.id,
        choice: ventone.data().choice,
        create_at: ventone.data().create_at,
        update_at: ventone.data().update_at,
      });
      this.ventchoiceresult.message = 'Ok';
      this.ventchoiceresult.result = this.ventchoice;
    };
    await Oneventchoice(id);
    return this.ventchoiceresult;
  }

  async findAll(): Promise<any> {
    const listAllventchoice = async () => {
      const db = getFirestore();
      const VentsRef = db.collection('VentChoice');
      const doc = await VentsRef.get();
      if (doc.empty) {
        console.log('Document is Empty');
      } else {
        this.ventchoice.length = 0;
        doc.docs.map((element) => {
          console.log(element.data());
          this.ventchoice.push({
            id: element.id,
            choice: element.data().choice,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
          });
          this.ventchoiceresult.message = 'Ok';
          this.ventchoiceresult.result = this.ventchoice;
        });
      }
      return this.ventchoiceresult;
    };
    await listAllventchoice();
    return this.ventchoiceresult;
  }

  async findCount(): Promise<any> {
    const listAllventchoice = async () => {
      this.ventchoice.length = 0;
      const db = getFirestore();
      const VentsRef = db.collection('VentChoice');
      const doc = await VentsRef.get();
      if (doc.empty) {
        console.log('Document is Empty');
      } else {
        this.ventchoice.length = 0;
        doc.docs.map((element) => {
          this.ventchoice.push({
            id: element.id,
            choice: element.data().choice,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
          });
          this.ventchoiceresultcount.message = 'Ok';
          this.ventchoiceresultcount.count = this.ventchoice.length;
          this.ventchoiceresultcount.result = this.ventchoice;
        });
      }
      return this.ventchoiceresultcount;
    };
    await listAllventchoice();
    return this.ventchoiceresultcount;
  }

  async create(body: VentChoice) {
    this.ventchoice.length = 0;
    const db = getFirestore();
    await db
      .collection('VentChoice')
      .add(<VentChoice>{
        choice: body.choice,
        create_at: firestore.Timestamp.now(),
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.ventchoiceresult.message = 'Successfully Created';
        this.ventchoiceresult.result = <VentChoice>{
          choice: body.choice,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        this.ventchoiceresult.message = error.code;
        this.ventchoiceresult.result = [];
      });
    return this.ventchoiceresult;
  }

  async update(body: VentChoice, id: string) {
    this.ventchoice.length = 0;
    const db = getFirestore();
    await db
      .collection('VentChoice')
      .doc(id)
      .update({
        choice: body.choice,
        update_at: firestore.Timestamp.now(),
      })
      .then(async () => {
        const ventone = await db.collection('VentChoice').doc(id).get();

        this.ventchoiceresult.message = 'Successfully Updated';
        this.ventchoiceresult.result = {
          id: ventone.id,
          choice: ventone.data().choice,
          create_at: ventone.data().create_at,
          update_at: ventone.data().update_at,
        };
      })
      .catch((error) => {
        this.ventchoiceresult.message = error.code;
        this.ventchoiceresult.result = [];
      });

    return this.ventchoiceresult;
  }

  async delete(id: string) {
    this.ventchoice.length = 0;
    const db = getFirestore();
    await db
      .collection('VentChoice')
      .doc(id)
      .delete()
      .then(() => {
        this.ventchoiceresult.message = 'Successfully Deleted';
        this.ventchoiceresult.result = [];
      })
      .catch((error) => {
        this.ventchoiceresult.message = error.code;
        this.ventchoiceresult.result = [];
      });

    return this.ventchoiceresult;
  }
}

export default VentChoiceService;
