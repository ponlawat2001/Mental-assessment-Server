import { Controller } from '@nestjs/common';
import { initializeApp } from 'firebase/app';

@Controller()
class FirebaseController {
  constructor() {
    require('dotenv').config();
    const firebaseConfig = {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    };
    initializeApp(firebaseConfig);
  }
}

export default FirebaseController;
