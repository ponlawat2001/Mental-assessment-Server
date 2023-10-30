import { Module } from '@nestjs/common';
import NewsController from '@controller/news.controller';
import NewsService from '@provider/news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
