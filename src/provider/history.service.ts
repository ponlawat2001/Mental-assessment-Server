import { Injectable } from '@nestjs/common';
import { History } from '@interface/history.interface';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';

Injectable();
class HistoryService {
  private readonly history: History[] = [];
  private historyresult = {
    message: '',
    result: null,
  };
  async findAll(): Promise<any> {
    const db = getFirestore();
    const HistoryRef = db.collection('History').orderBy('create_at', 'desc');
    const doc = await HistoryRef.get();
    this.history.length = 0;
    if (doc.empty) {
      console.log('Document is Empty');
      this.historyresult.message = 'Document is Empty';
      this.historyresult.result = [];
    } else {
      doc.docs.map((element) => {
        this.history.push({
          id: element.id,
          name: element.data().name,
          owner: element.data().owner,
          type: element.data().type,
          useranswer: element.data().useranswer,
          scorerate: element.data().scorerate,
          totalscore: element.data().totalscore,
          totalrate: element.data().totalrate,
          advise: element.data().advise,
          create_at: element.data().create_at,
        });
        this.historyresult.message = 'Ok';
        this.historyresult.result = this.history;
      });
    }
    return this.historyresult;
  }

  async findOne(id: string): Promise<any> {
    const db = getFirestore();
    const HistoryRef = db.collection('History').doc(id);
    const doc = await HistoryRef.get();
    if (doc == null) {
      console.log('Document is Empty');
      this.historyresult.message = 'Document is Empty';
      this.historyresult.result = [];
    } else {
      this.history.length = 0;
      this.history.push({
        id: doc.id,
        name: doc.data().name,
        owner: doc.data().owner,
        type: doc.data().type,
        useranswer: doc.data().useranswer,
        scorerate: doc.data().scorerate,
        totalscore: doc.data().totalscore,
        totalrate: doc.data().totalrate,
        advise: doc.data().advise,
        create_at: doc.data().create_at,
      });
      this.historyresult.message = 'Ok';
      this.historyresult.result = this.history;
    }
    return this.historyresult;
  }

  async create(body: History) {
    const db = getFirestore();
    await db
      .collection('History')
      .add(<History>{
        name: body.name,
        owner: body.owner,
        type: body.type,
        useranswer: body.useranswer,
        scorerate: body.scorerate,
        totalscore: body.totalscore,
        totalrate: body.totalrate,
        advise: body.advise,
        create_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.historyresult.message = 'Successfully Created';
        this.historyresult.result = <History>{
          name: body.name,
          owner: body.owner,
          type: body.type,
          useranswer: body.useranswer,
          scorerate: body.scorerate,
          totalscore: body.totalscore,
          totalrate: body.totalrate,
          advise: body.advise,
          create_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        this.historyresult.message = error.code;
        this.historyresult.result = [];
      });
    return this.historyresult;
  }
}

export default HistoryService;
