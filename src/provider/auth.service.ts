import { Injectable } from '@nestjs/common';
import { Login } from '@interface/auth.interface';
import {
  getAuth,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { res } from '@interface/auth.interface';
import { getAuth as Admin } from 'firebase-admin/auth';

@Injectable()
class AuthService {
  auth = getAuth();

  private result: res = {
    message: '',
    result: '',
  };

  async Reset_password(body: Login) {
    await sendPasswordResetEmail(this.auth, body.email)
      .then((res) => {
        this.result.message = 'Email sended';
        this.result.result = [];
        console.log(res);

        console.log('Reset password email was sended!');
      })
      .catch((error) => {
        this.result.message = error.code;
        this.result.result = '';
      });
    return this.result;
  }

  async Email_login(body: Login): Promise<any> {
    await signInWithEmailAndPassword(this.auth, body.email, body.password)
      .then((userCredential: any) => {
        this.result.message = 'Successful';
        this.result.result = userCredential.user.stsTokenManager.accessToken;
        console.log(userCredential.user.stsTokenManager);
      })
      .catch((error: any) => {
        this.result.message = error.code;
        this.result.result = '';
      });

    return this.result;
  }

  async Anonymous_login(): Promise<any> {
    await signInAnonymously(this.auth)
      .then((userCredential: any) => {
        this.result.message = 'Successful';
        this.result.result = userCredential.user;
        console.log(userCredential.user);
      })
      .catch((error: any) => {
        this.result.message = error.code;
        this.result.result = '';
      });

    return this.result;
  }
}
export default AuthService;
