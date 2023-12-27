import { News } from '@interface/news.interface';
import NewsService from '@provider/news.service';
declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(body: News): Promise<any>;
    update(body: News, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default NewsController;
