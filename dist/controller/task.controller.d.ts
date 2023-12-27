import { History } from '@interface/history.interface';
import TaskService from '@provider/task.service';
declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findOwner(owner: string): Promise<any>;
    update(body: History, id: string): Promise<any>;
    create(body: History): Promise<any>;
    delete(id: string): Promise<any>;
}
export default TaskController;
