import { Injectable } from '@nestjs/common';
import { getStorage } from 'firebase/storage';
import { Storage, Storageresult } from '@interface/storage.interface';
import firebaseAdmin from 'firebase-admin';
import { url } from 'inspector';

@Injectable()
class StorageService {
  private readonly storage: Storage[] = [];
  private readonly oneDayMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  private storageresult: Storageresult = {
    message: '',
    result: null,
  };

  async findOne(id: string): Promise<any> {
    var downloadUrl: string[];
    const bucket = firebaseAdmin.storage().bucket();
    const file = bucket.file(`AudioRecord/${id}`);
    const exists = await file.exists();
    if (exists[0]) {
      downloadUrl = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + this.oneDayMilliseconds,
      });
      this.storageresult.message = 'Ok';
      this.storageresult.result = downloadUrl;
    } else {
      this.storageresult.message = 'File not found';
      this.storageresult.result = null;
    }

    return this.storageresult;
  }

  async upload(audio: Express.Multer.File): Promise<any> {
    console.log(audio);
    const bucket = firebaseAdmin.storage().bucket();
    const filePath = `AudioRecord/${Date.now()}_${audio.originalname}`;
    const fileUpload = bucket.file(filePath);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: audio.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error(error);
      throw new Error('Error uploading file to Firebase Storage');
    });
    stream.on('finish', async () => {
      console.log(`Audio file uploaded to: ${filePath}`);
    });
    const downloadUrl = await fileUpload.getSignedUrl({
      action: 'read',
      expires: Date.now() + this.oneDayMilliseconds,
    });
    stream.end(audio.buffer);
    this.storageresult.message = 'ok';
    this.storageresult.result = downloadUrl;
    return this.storageresult;
  }
}

export default StorageService;
