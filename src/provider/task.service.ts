import { Injectable } from '@nestjs/common';
import { History as Task } from '@interface/history.interface';
import { Filter, getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';

Injectable();
class TaskService {
  private readonly task: Task[] = [];
  private taskresult = {
    message: '',
    result: null,
  };
  async findAll(): Promise<any> {
    const db = getFirestore();
    const taskRef = db.collection('Task').orderBy('create_at', 'desc');
    const doc = await taskRef.get();
    this.task.length = 0;
    if (doc.empty) {
      console.log('Document is Empty');
      this.taskresult.message = 'Document is Empty';
      this.taskresult.result = [];
    } else {
      doc.docs.map((element) => {
        this.task.push({
          id: element.id,
          owner: element.data().owner,
          type: element.data().type,
          summaryrate: element.data().summaryrate,
          summary: element.data().summary,
          create_at: element.data().create_at,
        });
        this.taskresult.message = 'Ok';
        this.taskresult.result = this.task;
      });
    }
    return this.taskresult;
  }

  async findOwner(owner: string): Promise<any> {
    const db = getFirestore();
    const taskRef = db.collection('Task');
    await taskRef
      .where(Filter.and(Filter.where('owner', '==', owner)))
      .orderBy('create_at', 'desc')
      .get()
      .then((element) => {
        this.task.length = 0;
        element.forEach((element) => {
          this.task.push({
            id: element.id,
            owner: element.data().owner,
            summaryrate: element.data().summaryrate,
            type: element.data().type,
            summary: element.data().summary,
            create_at: element.data().create_at,
          });
        });

        this.taskresult.message = 'Ok';
        this.taskresult.result = this.task;
        return this.taskresult;
      })
      .catch(() => {
        console.log('Document is Empty');
        this.taskresult.message = 'Document is Empty';
        this.taskresult.result = null;
        return this.taskresult;
      });
    return this.taskresult;
  }

  async findOne(id: string): Promise<any> {
    const db = getFirestore();
    const taskRef = db.collection('Task').doc(id);
    const doc = await taskRef.get();
    if (doc == null) {
      console.log('Document is Empty');
      this.taskresult.message = 'Document is Empty';
      this.taskresult.result = [];
    } else {
      this.task.length = 0;
      this.task.push({
        id: doc.id,
        owner: doc.data().owner,
        type: doc.data().type,
        summaryrate: doc.data().summaryrate,
        summary: doc.data().summary,
        create_at: doc.data().create_at,
      });
      this.taskresult.message = 'Ok';
      this.taskresult.result = this.task;
    }
    return this.taskresult;
  }

  async update(id: string, body: Task) {
    const db = getFirestore();
    console.log(id);
    await db
      .collection('Task')
      .doc(id)
      .update({
        summary: body.summary,
        create_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.taskresult.message = 'Successfully Created';
        this.taskresult.result = <Task>{
          summary: body.summary,
          create_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        console.log(error);
        this.taskresult.message = error.code;
        this.taskresult.result = [];
      });
    return this.taskresult;
  }

  async create(body: Task) {
    const db = getFirestore();
    await db
      .collection('Task')
      .add(<Task>{
        type: body.type,
        owner: body.owner,
        summary: body.summary,
        create_at: firestore.Timestamp.now(),
      })
      .then((res) => {
        this.taskresult.message = 'Successfully Created';
        this.taskresult.result = <Task>{
          id: res.id,
          type: body.type,
          owner: body.owner,
          summary: body.summary,
          create_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        this.taskresult.message = error.code;
        this.taskresult.result = [];
      });
    return this.taskresult;
  }

  async delete(id: string) {
    const db = getFirestore();
    await db
      .collection('Task')
      .doc(id)
      .delete()
      .then(() => {
        this.taskresult.message = 'Delete Successfully';
        this.taskresult.result = [];
      })
      .catch((error) => {
        this.taskresult.message = error.code;
        this.taskresult.result = [];
      });
    return this.taskresult;
  }
}

export default TaskService;
