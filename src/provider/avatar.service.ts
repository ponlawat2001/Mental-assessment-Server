import { Avatar } from '@interface/avatar.interface';
import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

Injectable();
class AvatarService {
  private readonly avatar: Avatar[] = [];
  private avatarresultcount = {
    message: '',
    count: 0,
    result: null,
  };
  private avatarresult = {
    message: '',
    result: null,
  };

  async findAll(): Promise<any> {
    const db = getFirestore();
    const AvatarRef = db.collection('Avatars');
    const doc = await AvatarRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.avatar.length = 0;
      doc.docs.map((element) => {
        this.avatar.push({
          id: element.id,
          email: element.data().email,
          avatar: element.data().avatar,
          favorite: element.data().favorite,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
        });
        this.avatarresult.message = 'Ok';
        this.avatarresult.result = this.avatar;
      });
    }
    return this.avatarresult;
  }

  async findCount(): Promise<any> {
    const db = getFirestore();
    const AvatarRef = db.collection('Avatars');
    const doc = await AvatarRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.avatar.length = 0;
      doc.docs.map((element) => {
        this.avatar.push({
          id: element.id,
          email: element.data().email,
          avatar: element.data().avatar,
          favorite: element.data().favorite,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
        });
        this.avatarresultcount.message = 'Ok';
        this.avatarresultcount.count = this.avatar.length;
        this.avatarresultcount.result = this.avatar;
      });
    }
    return this.avatarresultcount;
  }

  async findOne(email: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Avatars')
      .where('email', '==', email)
      .get()
      .then((element) => {
        this.avatar.length = 0;
        element.forEach((element) => {
          this.avatar.push({
            id: element.id,
            email: element.data().email,
            avatar: element.data().avatar,
            favorite: element.data().favorite,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
          });
        });

        this.avatarresult.message = 'Ok';
        this.avatarresult.result = this.avatar;
        return this.avatarresult;
      })
      .catch(() => {
        console.log('Document is Empty');
        this.avatarresult.message = 'Document is Empty';
        this.avatarresult.result = [
          {
            email: '',
            avatar: '',
          },
        ];
        return this.avatarresult;
      });
    return this.avatarresult;
  }

  async update(body: Avatar, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Avatars')
      .doc(id)
      .update({
        avatar: body.avatar,
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.avatarresult.message = 'Successfully Updated';
        this.avatarresult.result = [];
      })
      .catch((error) => {
        this.avatarresult.message = error;
        this.avatarresult.result = [];
      });
    return this.avatarresult;
  }

  async create(body: Avatar) {
    const db = getFirestore();
    await db
      .collection('Avatars')
      .add(<Avatar>{
        avatar: body.avatar,
        email: body.email,
        create_at: firestore.Timestamp.now(),
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.avatarresult.message = 'Successfully Created';
        this.avatarresult.result = <Avatar>{
          avatar: body.avatar,
          email: body.email,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        this.avatarresult.message = error.code;
        this.avatarresult.result = [];
      });
    return this.avatarresult;
  }

  async favorite(body: Avatar, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Avatars')
      .doc(id)
      .update({
        favorite: body.favorite,
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.avatarresult.message = 'Successfully Favorite';
        this.avatarresult.result = [];
      })
      .catch((error) => {
        this.avatarresult.message = error;
        this.avatarresult.result = [];
      });
    return this.avatarresult;
  }
}

export default AvatarService;
