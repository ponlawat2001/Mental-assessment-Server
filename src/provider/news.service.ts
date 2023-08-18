import { Injectable } from '@nestjs/common';
import { News } from '../interface/news.interface';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
class NewsService {
  private readonly news: News[] = [];

  async findOne(id: string): Promise<News[]> {
    const db = getFirestore();
    const NewsRef = db.collection('News');
    const newsone = await NewsRef.doc(id).get();
    if (newsone == null) {
      console.log("Document doesn't exist");
    } else {
      this.news.push({
        id: newsone.id,
        news_content: newsone.data().news_content,
        image_URL: newsone.data().image_URL,
        create_at: newsone.data().create_at,
        update_at: newsone.data().update_at,
        is_delete: newsone.data().is_delete,
      });
    }

    return this.news;
  }

  async findAll(): Promise<News[]> {
    const db = getFirestore();
    const NewsRef = db.collection('News');
    const doc = await NewsRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.news.length = 0;
      doc.docs.map((element) => {
        this.news.push({
          id: element.id,
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

  async create(body: News): Promise<News> {
    const db = getFirestore();
    await db.collection('News').add(body);
    return body;
  }
}

export default NewsService;
