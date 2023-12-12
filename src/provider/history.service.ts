import { Injectable } from '@nestjs/common';
import { History } from '@interface/history.interface';
import { Filter, getFirestore } from 'firebase-admin/firestore';
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
          owner: element.data().owner,
          type: element.data().type,
          summaryrate: element.data().summaryrate,
          summary: element.data().summary,
          create_at: element.data().create_at,
        });
        this.historyresult.message = 'Ok';
        this.historyresult.result = this.history;
      });
    }
    return this.historyresult;
  }

  async findOwner(owner: string): Promise<any> {
    const db = getFirestore();
    const HistoryRef = db.collection('History');
    await HistoryRef.where(Filter.and(Filter.where('owner', '==', owner)))
      .orderBy('create_at', 'desc')
      .get()
      .then((element) => {
        this.history.length = 0;
        element.forEach((element) => {
          this.history.push({
            id: element.id,
            owner: element.data().owner,
            summaryrate: element.data().summaryrate,
            type: element.data().type,
            summary: element.data().summary,
            create_at: element.data().create_at,
          });
        });

        this.historyresult.message = 'Ok';
        this.historyresult.result = this.history;
        return this.historyresult;
      })
      .catch(() => {
        console.log('Document is Empty');
        this.historyresult.message = 'Document is Empty';
        this.historyresult.result = null;
        return this.historyresult;
      });
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
        owner: doc.data().owner,
        type: doc.data().type,
        summaryrate: doc.data().summaryrate,
        summary: doc.data().summary,
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
        type: body.type,
        owner: body.owner,
        summary: body.summary,
        summaryrate: body.summaryrate,
        create_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.historyresult.message = 'Successfully Created';
        this.historyresult.result = <History>{
          type: body.type,
          owner: body.owner,
          summary: body.summary,
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
