import { History } from '@interface/history.interface';
declare class HistoryService {
    private readonly history;
    private historyresult;
    findAll(): Promise<any>;
    findOwner(owner: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(body: History): Promise<{
        message: string;
        result: any;
    }>;
}
export default HistoryService;
