import { Injectable } from '@nestjs/common';
import { Storage, Storageresult } from '@interface/storage.interface';
import firebaseAdmin from 'firebase-admin';
import { File } from '@google-cloud/storage';

@Injectable()
class StorageService {
  private readonly storage: Storage[] = [];
  private readonly oneDayMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  private storageresult: Storageresult = {
    message: '',
    result: null,
  };

  async findOne(id: string, isimage: boolean): Promise<any> {
    var downloadUrl: string[];
    var file: File;
    const bucket = firebaseAdmin.storage().bucket();
    if (!isimage) {
      file = bucket.file(`AudioRecord/${id}`);
    } else {
      file = bucket.file(`Images/${id}`);
    }
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

  async upload(file: Express.Multer.File, isimage: boolean): Promise<any> {
    var filePath: string;
    const bucket = firebaseAdmin.storage().bucket();
    if (!isimage) {
      filePath = `AudioRecord/${Date.now()}_${file.originalname}`;
    } else {
      filePath = `Images/${Date.now()}_${file.originalname}`;
    }
    const fileUpload = bucket.file(filePath);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error(error);
      throw new Error('Error uploading file to Firebase Storage');
    });
    stream.on('finish', async () => {
      console.log(`File uploaded to: ${filePath}`);
    });
    const downloadUrl = await fileUpload.getSignedUrl({
      action: 'read',
      expires: Date.now() + this.oneDayMilliseconds,
    });
    stream.end(file.buffer);
    this.storageresult.message = 'ok';
    this.storageresult.result = downloadUrl;
    return this.storageresult;
  }
}

export default StorageService;
