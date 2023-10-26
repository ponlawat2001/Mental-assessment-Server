import { Injectable } from '@nestjs/common';
import { Login } from '@interface/auth.interface';
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { res } from '@interface/auth.interface';

@Injectable()
class AuthService {
  private result: res = {
    message: '',
    result: '',
  };

  async Email_login(body: Login): Promise<any> {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, body.email, body.password)
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
    const auth = getAuth();
    await signInAnonymously(auth)
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
