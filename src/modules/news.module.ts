import { Module } from '@nestjs/common';
import NewsController from 'src/controller/news.controller';
import NewsService from 'src/provider/news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
