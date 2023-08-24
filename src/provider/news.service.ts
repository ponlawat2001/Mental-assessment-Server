import { Injectable } from '@nestjs/common';
import { News } from '../interface/news.interface';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
class NewsService {
  private readonly news: News[] = [];
  private newsresultcount = {
    message: '',
    count: 0,
    result: [],
  };
  private newsresult = {
    message: '',
    result: [],
  };

  async findOne(id: string): Promise<any> {
    const db = getFirestore();
    const NewsRef = db.collection('News');
    const newsone = await NewsRef.doc(id).get();
    if (newsone == null) {
      console.log("Document doesn't exist");
    } else {
      this.news.length = 0;
      this.news.push({
        id: newsone.id,
        title: newsone.data().title,
        intro: newsone.data().intro,
        news_content: newsone.data().news_content,
        image_URL: newsone.data().image_URL,
        create_at: newsone.data().create_at,
        update_at: newsone.data().update_at,
        is_delete: newsone.data().is_delete,
      });
      console.log(newsone.data());
      this.newsresult.message = 'Ok';
      this.newsresult.result = this.news;
    }

    return this.newsresult;
  }

  async findAll(): Promise<any> {
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
          title: element.data().title,
          intro: element.data().intro,
          news_content: element.data().news_content,
          image_URL: element.data().image_URL,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
          is_delete: element.data().is_delete,
        });
      });
      this.newsresult.message = 'Ok';
      this.newsresult.result = this.news;
    }

    return this.newsresult;
  }
  async findCount(): Promise<any> {
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
          intro: element.data().intro,
          title: element.data().title,
          news_content: element.data().news_content,
          image_URL: element.data().image_URL,
          create_at: element.data().create_at,
          update_at: element.data().update_at,
          is_delete: element.data().is_delete,
        });
      });
      this.newsresultcount.count = this.news.length;
      this.newsresultcount.message = 'Ok';
      this.newsresultcount.result = this.news;
    }

    return this.newsresultcount;
  }

  async create(body: News): Promise<News> {
    const db = getFirestore();
    await db.collection('News').add(body);
    return body;
  }
}

export default NewsService;
