import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CatsController from './controller/cats.controller';
import CatsService from './provider/cats.service';
import NewsService from './provider/news.service';
import NewsController from './controller/news.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, NewsController],
  providers: [AppService, CatsService, NewsService],
})
export class AppModule {}
