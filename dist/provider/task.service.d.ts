import { History as Task } from '@interface/history.interface';
declare class TaskService {
    private readonly task;
    private taskresult;
    findAll(): Promise<any>;
    findOwner(owner: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, body: Task): Promise<{
        message: string;
        result: any;
    }>;
    create(body: Task): Promise<{
        message: string;
        result: any;
    }>;
    delete(id: string): Promise<{
        message: string;
        result: any;
    }>;
}
export default TaskService;
