import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { Audio } from '@interface/audio.interface';
import { Filter, getFirestore } from 'firebase-admin/firestore';

Injectable();
class AudioService {
  private readonly audio: Audio[] = [];
  private audioresult = {
    message: '',
    result: null,
  };

  async findOwner(owner: string): Promise<any> {
    const db = getFirestore();
    const VentsRef = db.collection('Audio');
    await VentsRef.where(
      Filter.and(
        Filter.where('owner', '==', owner),
        Filter.where('is_delete', '==', false),
      ),
    )
      .orderBy('update_at', 'desc')
      .get()
      .then((element) => {
        this.audio.length = 0;
        element.forEach((element) => {
          this.audio.push({
            id: element.id,
            owner: element.data().owner,
            audioUrl: element.data().audioUrl,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
            is_delete: element.data().is_delete,
          });
        });

        this.audioresult.message = 'Ok';
        this.audioresult.result = this.audio;
        return this.audioresult;
      })
      .catch(() => {
        console.log('Document is Empty');
        this.audioresult.message = 'Document is Empty';
        this.audioresult.result = null;
        return this.audioresult;
      });
    return this.audioresult;
  }

  async update(body: Audio, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Audio')
      .doc(id)
      .update({
        imageUrl: body.audioUrl,
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.audioresult.message = 'Successfully Updated';
        this.audioresult.result = [];
      })
      .catch((error) => {
        this.audioresult.message = error;
        this.audioresult.result = null;
      });
    return this.audioresult;
  }

  async delete(id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Audio')
      .doc(id)
      .update({
        is_delete: true,
      })
      .then(() => {
        this.audioresult.message = 'Successfully Deleted!';
        this.audioresult.result = [];
      })
      .catch((error) => {
        this.audioresult.message = error;
        this.audioresult.result = [];
      });
    return this.audioresult;
  }

  async create(body: Audio) {
    const db = getFirestore();
    await db
      .collection('Audio')
      .add(<Audio>{
        owner: body.owner,
        audioUrl: body.audioUrl,
        create_at: firestore.Timestamp.now(),
        update_at: firestore.Timestamp.now(),
        is_delete: false,
      })
      .then(() => {
        this.audioresult.message = 'Successfully Created';
        this.audioresult.result = <Audio>{
          owner: body.owner,
          audioUrl: body.audioUrl,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
          is_delete: false,
        };
      })
      .catch((error) => {
        this.audioresult.message = error.code;
        this.audioresult.result = [];
      });
    return this.audioresult;
  }
}

export default AudioService;
