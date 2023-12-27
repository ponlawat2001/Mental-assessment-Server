import { News } from '@interface/news.interface';
declare class NewsService {
    private readonly news;
    private newsresult;
    private newsresultcount;
    private isdelete_check;
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(body: News): Promise<any>;
    update(body: News, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default NewsService;
