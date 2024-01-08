import { Login } from '@interface/auth.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import admin from 'firebase-admin';

@Injectable()
class PreauthMiddleware implements NestMiddleware {
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
      admin
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then((decodedToken: admin.auth.DecodedIdToken) => {
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
