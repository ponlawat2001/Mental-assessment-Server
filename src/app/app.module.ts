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
import { log } from 'console';
import { AvatarModule } from 'src/modules/avatar.modult';
import { VentChoiceModule } from 'src/modules/vent_choice.module';
import { ContactModule } from 'src/modules/contact.module';
import { StorageModule } from 'src/modules/storage.module';
import { AudioModule } from 'src/modules/audio.module';
import { ImagesModule } from 'src/modules/images.module';
import { AssessmentModule } from 'src/modules/assessment.module';
import { HistoryModule } from 'src/modules/historymodules';
import { TaskModule } from 'src/modules/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'),
    }),
    TaskModule,
    HistoryModule,
    AssessmentModule,
    AuthModule,
    NewsModule,
    VentModule,
    VentChoiceModule,
    UsersModule,
    AvatarModule,
    ContactModule,
    AudioModule,
    ImagesModule,
    StorageModule,
  ],
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
      { path: 'avatars/*' },
      { path: 'vent/*' },
      { path: 'contact/*' },
      { path: 'audio/*' },
      { path: 'image/*' },
      { path: 'storage/*' },
      { path: 'assessment/*' },
      { path: 'history/*' },
      { path: 'task/* ' },
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
