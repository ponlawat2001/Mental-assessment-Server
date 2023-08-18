import { Controller, Get } from '@nestjs/common';
import { News } from 'src/interface/news.interface';
import NewsService from 'src/provider/news.service';

@Controller('news')
class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('find')
  async find(): Promise<News[]> {
    return this.newsService.find();
  }

  @Get('findAll')
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }
}
export default NewsController;
