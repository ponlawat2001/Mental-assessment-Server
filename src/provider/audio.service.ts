import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { Audio } from '@interface/audio.interface';
import { getFirestore } from 'firebase-admin/firestore';

Injectable();
class AudioService {
  private readonly audio: Audio[] = [];
  private audioresult = {
    message: '',
    result: null,
  };

  async findOne(owner: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Audio')
      .where('owner', '==', owner)
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
          });
        });

        this.audioresult.message = 'Ok';
        this.audioresult.result = this.audio;
        return this.audioresult;
      })
      .catch(() => {
        console.log('Document is Empty');
        this.audioresult.message = 'Document is Empty';
        this.audioresult.result = [
          {
            owner: '',
            audioUrl: '',
          },
        ];
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
      })
      .then(() => {
        this.audioresult.message = 'Successfully Created';
        this.audioresult.result = <Audio>{
          owner: body.owner,
          audioUrl: body.audioUrl,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
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
