import { Injectable } from '@nestjs/common';
import { News, Newsresult, Newsresultcount } from '@interface/news.interface';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
class NewsService {
  private readonly news: News[] = [];
  private newsresult: Newsresult = {
    message: '',
    result: null,
  };
  private newsresultcount: Newsresultcount = {
    message: '',
    count: 0,
    result: null,
  };

  private isdelete_check(data: any) {
    return data.is_delete == true ? true : false;
  }

  async findOne(id: string): Promise<any> {
    const db = getFirestore();
    const NewsRef = db.collection('News');
    const newsone = await NewsRef.doc(id).get();
    if (newsone == null || this.isdelete_check(newsone.data())) {
      this.newsresult.message = 'Document doesnt exist';
      this.newsresult.result = [];
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
        if (this.isdelete_check(element.data())) {
          this.newsresult.message = 'Document doesnt exist';
          this.newsresult.result = [];
        } else {
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
          this.newsresult.message = 'Ok';
          this.newsresult.result = this.news;
        }
      });
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
        if (this.isdelete_check(element.data())) {
          this.newsresult.message = 'Document doesnt exist';
          this.newsresult.result = [];
        } else {
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
        }
        this.newsresultcount.count = this.news.length;
        this.newsresultcount.message = 'Ok';
        this.newsresultcount.result = this.news;
      });
    }

    return this.newsresultcount;
  }

  async create(body: News): Promise<any> {
    const db = getFirestore();
    await db
      .collection('News')
      .add(body)
      .then(() => {
        this.newsresult.message = 'Successfully Created';
        this.newsresult.result = [];
      })
      .catch((error) => {
        this.newsresult.message = error.code;
        this.newsresult.result = [];
      });
    return this.newsresult;
  }

  async update(body: News, id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('News')
      .doc(id)
      .set(body)
      .then(() => {
        this.newsresult.message = 'Successfully Updated';
        this.newsresult.result = [];
      })
      .catch((error) => {
        this.newsresult.message = error.code;
        this.newsresult.result = [];
      });
    return this.newsresult;
  }

  async delete(id: string): Promise<any> {
    const db = getFirestore();
    await db
      .collection('News')
      .doc(id)
      .update({
        is_delete: true,
      })
      .then(() => {
        this.newsresult.message = 'Successfully Deleted';
        this.newsresult.result = [];
      })
      .catch((error) => {
        this.newsresult.message = error.code;
        this.newsresult.result = [];
      });

    return this.newsresult;
  }
}

export default NewsService;
