"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
let NewsService = class NewsService {
    constructor() {
        this.news = [];
        this.newsresult = {
            message: '',
            result: null,
        };
        this.newsresultcount = {
            message: '',
            count: 0,
            result: null,
        };
    }
    isdelete_check(data) {
        return data.is_delete == true ? true : false;
    }
    async findOne(id) {
        const db = (0, firestore_1.getFirestore)();
        const NewsRef = db.collection('News');
        const newsone = await NewsRef.doc(id).get();
        if (newsone == null || this.isdelete_check(newsone.data())) {
            this.newsresult.message = 'Document doesnt exist';
            this.newsresult.result = [];
        }
        else {
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
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const NewsRef = db.collection('News').orderBy('create_at', 'desc');
        const doc = await NewsRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.news.length = 0;
            doc.docs.map((element) => {
                if (this.isdelete_check(element.data())) {
                    this.newsresult.message = 'Document doesnt exist';
                    this.newsresult.result = [];
                }
                else {
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
    async findCount() {
        const db = (0, firestore_1.getFirestore)();
        const NewsRef = db.collection('News');
        const doc = await NewsRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.news.length = 0;
            doc.docs.map((element) => {
                if (this.isdelete_check(element.data())) {
                    this.newsresult.message = 'Document doesnt exist';
                    this.newsresult.result = [];
                }
                else {
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
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('News')
            .add({
            title: body.title,
            intro: body.intro,
            image_URL: body.image_URL,
            news_content: body.news_content,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            is_delete: false,
        })
            .then(() => {
            this.newsresult.message = 'Successfully Created';
            this.newsresult.result = body;
        })
            .catch((error) => {
            this.newsresult.message = error.code;
            this.newsresult.result = [];
        });
        return this.newsresult;
    }
    async update(body, id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('News')
            .doc(id)
            .update({
            title: body.title,
            intro: body.intro,
            image_URL: body.image_URL,
            news_content: body.news_content,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
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
    async delete(id) {
        const db = (0, firestore_1.getFirestore)();
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
};
NewsService = __decorate([
    (0, common_1.Injectable)()
], NewsService);
exports.default = NewsService;
//# sourceMappingURL=news.service.js.map