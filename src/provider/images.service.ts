import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { Audio } from '@interface/audio.interface';
import { getFirestore } from 'firebase-admin/firestore';
import { Images } from '@interface/images.interface';

Injectable();
class ImagesService {
  private readonly images: Images[] = [];
  private imagesresult = {
    message: '',
    result: null,
  };

  async findOwner(owner: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Images')
      .where('owner', '==', owner)
      .get()
      .then((element) => {
        this.images.length = 0;
        element.forEach((element) => {
          this.images.push({
            id: element.id,
            owner: element.data().owner,
            imageUrl: element.data().imageUrl,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
          });
        });

        this.imagesresult.message = 'Ok';
        this.imagesresult.result = this.images;
        return this.imagesresult;
      })
      .catch(() => {
        console.log('Document is Empty');
        this.imagesresult.message = 'Document is Empty';
        this.imagesresult.result = [
          {
            owner: '',
            imageUrl: '',
          },
        ];
        return this.imagesresult;
      });
    return this.imagesresult;
  }

  async update(body: Images, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('Images')
      .doc(id)
      .update({
        imageUrl: body.imageUrl,
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.imagesresult.message = 'Successfully Updated';
        this.imagesresult.result = [];
      })
      .catch((error) => {
        this.imagesresult.message = error;
        this.imagesresult.result = [];
      });
    return this.imagesresult;
  }

  async create(body: Images) {
    const db = getFirestore();
    await db
      .collection('Images')
      .add(<Images>{
        owner: body.owner,
        imageUrl: body.imageUrl,
        create_at: firestore.Timestamp.now(),
        update_at: firestore.Timestamp.now(),
      })
      .then(() => {
        this.imagesresult.message = 'Successfully Created';
        this.imagesresult.result = <Images>{
          owner: body.owner,
          imageUrl: body.imageUrl,
          create_at: firestore.Timestamp.now(),
          update_at: firestore.Timestamp.now(),
        };
      })
      .catch((error) => {
        this.imagesresult.message = error.code;
        this.imagesresult.result = [];
      });
    return this.imagesresult;
  }
}

export default ImagesService;
