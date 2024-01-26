import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';
import { Adminusers } from '@interface/adminusers.interface';

Injectable();
class AdminusersService {
  private readonly adminusers: Adminusers[] = [];
  private adminresult = {
    message: '',
    result: null,
  };

  async findAll(): Promise<any> {
    const db = getFirestore();
    const AdminRef = db.collection('Admin');
    const doc = await AdminRef.get();
    this.adminusers.length = 0;
    if (doc.empty) {
      console.log('Document is Empty');
      this.adminresult.message = 'Document is Empty';
      this.adminresult.result = [];
    } else {
      doc.docs.map((element) => {
        this.adminusers.push({
          id: element.id,
          email: element.data().email,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
        });
        this.adminresult.message = 'Ok';
        this.adminresult.result = this.adminusers;
      });
    }
    return this.adminresult;
  }

  async findEmail(email: string): Promise<any> {
    const db = getFirestore();
    const AdminRef = db.collection('Admin').where('email', '==', email);
    const doc = await AdminRef.get();
    this.adminusers.length = 0;
    if (doc.empty) {
      console.log('Document is Empty');
      this.adminresult.message = 'Document is Empty';
      this.adminresult.result = [];
    } else {
      doc.docs.map((element) => {
        this.adminusers.push({
          id: element.id,
          email: element.data().email,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
        });
        this.adminresult.message = 'Ok';
        this.adminresult.result = this.adminusers;
      });
    }
    return this.adminresult;
  }

  async findOne(id: string): Promise<any> {
    const db = getFirestore();
    const AdminRef = db.collection('Admin').doc(id);
    const doc = await AdminRef.get();
    if (doc == null) {
      console.log('Document is Empty');
      this.adminresult.message = 'Document is Empty';
      this.adminresult.result = [];
    } else {
      this.adminusers.length = 0;
      this.adminusers.push({
        id: doc.id,
        email: doc.data().email,
        create_at: doc.data().create_at,
        update_at: doc.data().update_at,
      });
      this.adminresult.message = 'Ok';
      this.adminresult.result = this.adminusers;
    }
    return this.adminresult;
  }

  async update(body: Adminusers, id: string): Promise<any> {
    this.adminusers.length = 0;
    const db = getFirestore();
    await db
      .collection('Admin')
      .doc(id)
      .update({
        email: body.email,
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.adminresult.message = 'Successfully Updated';
        this.adminresult.result = [];
      })
      .catch((error) => {
        this.adminresult.message = error;
        this.adminresult.result = null;
      });
    return this.adminresult;
  }

  async delete(id: string): Promise<any> {
    this.adminusers.length = 0;
    const db = getFirestore();
    await db
      .collection('Admin')
      .doc(id)
      .delete()
      .then(() => {
        this.adminresult.message = 'Successfully Delete';
        this.adminresult.result = [];
      })
      .catch((error) => {
        this.adminresult.message = error;
        this.adminresult.result = null;
      });
    return this.adminresult;
  }

  async create(body: Adminusers) {
    const db = getFirestore();
    await db
      .collection('Admin')
      .add(<Adminusers>{
        email: body.email,
        create_at: firestore.Timestamp.now(),
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.adminresult.message = 'Successfully Created';
        this.adminresult.result = <Adminusers>{
          email: body.email,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        this.adminresult.message = error.code;
        this.adminresult.result = [];
      });
    return this.adminresult;
  }
}

export default AdminusersService;
