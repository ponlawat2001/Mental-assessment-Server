import { Injectable } from '@nestjs/common';
import { News } from '../interface/news.interface';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

@Injectable()
class NewsService {
  private readonly news: News[] = [];

  async find(): Promise<News[]> {
    const db = getFirestore();
    const NewsRef = db.collection('News');
    const doc = await NewsRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      doc.docs.map((element) => {
        this.news.length = 0;
        this.news.push({
          news_ID: element.data().news_ID,
          news_content: element.data().news_content,
          image_URL: element.data().image_URL,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
          is_delete: element.data().is_delete,
        });
      });
    }
    return this.news;
  }

  findAll(): News[] {
    return [
      {
        news_ID: '1',
        news_content: 'Micmic',
        image_URL: '12312',
        update_at: Timestamp.now(),
        create_at: Timestamp.now(),
        is_delete: false,
      },
    ];
  }
}

export default NewsService;
