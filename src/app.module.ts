import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firebase.module';
import CatsController from './controller/cats.controller';
import CatsService from './provider/cats.service';
import NewsService from './provider/news.service';
import NewsController from './controller/news.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, CatsController, NewsController],
  providers: [AppService, CatsService, NewsService],
})
export class AppModule {}
