import HistoryService from '@provider/history.service';
import { History } from '@interface/history.interface';
declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findOwner(owner: string): Promise<any>;
    create(body: History): Promise<any>;
}
export default HistoryController;
