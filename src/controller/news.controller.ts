import { Controller, Get } from '@nestjs/common';
import { News } from 'src/interface/news.interface';
import NewsService from 'src/provider/news.service';

@Controller('news')
class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async find(): Promise<News[]> {
    return this.newsService.find();
  }
}
export default NewsController;
