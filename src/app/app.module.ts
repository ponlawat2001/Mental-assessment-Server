import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PreauthMiddleware from '../middleware/preauth.middleware';
import FirebaseController from '../controller/firebase.controller';
import { AuthModule } from '../modules/auth.module';
import { NewsModule } from '../modules/news.module';
import { VentModule } from '../modules/vent.module';
import { UsersModule } from '../modules/users.module';

@Module({
  imports: [AuthModule, NewsModule, VentModule, UsersModule],
  controllers: [AppController, FirebaseController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'news/*/sdfdsfds',
      method: RequestMethod.ALL,
    });
    consumer.apply(PreauthMiddleware).forRoutes({
      path: 'users/findAll/sdfdsfsf',
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
