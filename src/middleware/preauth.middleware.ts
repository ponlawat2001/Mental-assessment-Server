import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import admin from 'firebase-admin';

@Injectable()
class PreauthMiddleware implements NestMiddleware {
  private defaultAppadmin: any;
  constructor() {
    require('dotenv').config();

    const firebaseparam = {
      type: process.env.type,
      projectId: process.env.project_id,
      privateKeyId: process.env.project_id,
      privateKey: process.env.private_key.replace(/\\n/g, '\n'),
      clientEmail: process.env.client_email,
      clientId: process.env.client_id,
      authUri: process.env.auth_uri,
      tokenUri: process.env.token_uri,
      authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
      clientX509CertUrl: process.env.client_x509_cert_url,
      universeDomain: process.env.universe_domain,
    };

    this.defaultAppadmin = admin.initializeApp({
      credential: admin.credential.cert(firebaseparam),
      storageBucket: process.env.storageBucket,
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
    res.status(401).json({
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
