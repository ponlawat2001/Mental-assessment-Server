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
import { count, log } from 'console';

@Module({
  imports: [AuthModule, NewsModule, VentModule, UsersModule],
  controllers: [AppController, FirebaseController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    type middlewareRoute = {
      path: string;
    };
    let route: middlewareRoute[] = [
      { path: 'news/*' },
      { path: 'users/findAll' },
      { path: 'users/findCount' },
      { path: 'users/findOne' },
      { path: 'users/findOneAvatar/*' },
      { path: 'users/update/*' },
      { path: 'users/delete/*' },
      { path: 'vent/*' },
    ];
    route.map((element) => {
      log(element.path);
      consumer.apply(PreauthMiddleware).forRoutes({
        path: element.path,
        method: RequestMethod.ALL,
      });
    });
  }
}
