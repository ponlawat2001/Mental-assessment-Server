import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PreauthMiddleware from './middleware/preauth.middleware';
import NewsService from './provider/news.service';
import NewsController from './controller/news.controller';
import AuthController from './controller/auth.controller';
import AuthService from './provider/auth.service';
import FirebaseController from './controller/firebase.controller';
import UsersController from './controller/users.controller';
import UsersService from './provider/users.service';
import VentController from './controller/vent.controller';
import VentService from './provider/vent.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    NewsController,
    AuthController,
    UsersController,
    FirebaseController,
    VentController,
  ],
  providers: [AppService, NewsService, AuthService, UsersService, VentService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'news/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'users/findAll',
      method: RequestMethod.ALL,
    });
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'users/findCount',
      method: RequestMethod.ALL,
    });
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'users/findOne',
      method: RequestMethod.ALL,
    });
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'users/update/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'vent/*',
      method: RequestMethod.ALL,
    });
  }
}
