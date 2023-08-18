import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { News } from '../interface/news.interface';
import { Newsinterface } from '../interface/news.interface';
import { CollectionReference } from '@google-cloud/firestore';

@Injectable()
class NewsService {
  private readonly news: News[] = [];

  constructor(
    @Inject(Newsinterface.collectionName)
    private Newsinterface: CollectionReference<Newsinterface>,
  ) {}

  create(news: News) {
    this.news.push(news);
  }

  async find(): Promise<News[]> {
    try {
      const snapshot = await this.Newsinterface.get();
      snapshot.forEach((doc) => this.news.push(doc.data()));
    } catch (error) {}
    return this.news;
  }
}

export default NewsService;
