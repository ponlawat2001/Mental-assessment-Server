import { Controller } from '@nestjs/common';
import { initializeApp } from 'firebase/app';

@Controller()
class FirebaseController {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAt8eojbI8_sXB1_gdIG-uHiLfqGltjUAo',
      authDomain: 'mental-assessment.firebaseapp.com',
      projectId: 'mental-assessment',
      storageBucket: 'mental-assessment.appspot.com',
      messagingSenderId: '48737335927',
      appId: '1:48737335927:web:6818faac97c70c93c6a472',
    };
    initializeApp(firebaseConfig);
  }
}

export default FirebaseController;
