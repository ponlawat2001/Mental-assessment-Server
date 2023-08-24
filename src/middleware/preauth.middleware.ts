import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import admin, { initializeApp } from 'firebase-admin';

@Injectable()
class PreauthMiddleware implements NestMiddleware {
  private defaultAppadmin: any;
  constructor() {
    const serviceAccount = require('../../firebaseadmin/service-account.json');

    this.defaultAppadmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }

  private unauthorized(res: Response) {
    res.status(403).json({
      message: 'Unauthorized',
    });
  }

  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultAppadmin
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken: { email: string }) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error: any) => {
          console.error(error);
          this.accessDenied(req.url, res);
        });
    } else {
      this.unauthorized(res);
    }
  }
}

export default PreauthMiddleware;
