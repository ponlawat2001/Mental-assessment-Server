import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { News } from 'src/interface/news.interface';
import NewsService from 'src/provider/news.service';

@Controller('news')
class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      const newsall = {
        message: 'OK',
        result: await this.newsService.findOne(id),
      };
      return newsall;
    } catch (error) {
      const newserror = {
        message: error,
      };
      throw newserror;
    }
  }

  @Get('findAll')
  async findAll(): Promise<any> {
    try {
      const newsall = {
        message: 'OK',
        result: await this.newsService.findAll(),
      };
      return newsall;
    } catch (error) {
      const newserror = {
        message: error,
      };
      throw newserror;
    }
  }

  @Get('findCount')
  async findCount(): Promise<any> {
    try {
      const newscount = {
        message: 'OK',
        count: (await this.newsService.findAll()).length,
        result: await this.newsService.findAll(),
      };
      return newscount;
    } catch (error) {
      const newserror = {
        message: error,
      };
      throw newserror;
    }
  }

  @Post('create')
  async create(@Body() body: News): Promise<any> {
    return this.newsService.create(body);
  }
}
export default NewsController;
