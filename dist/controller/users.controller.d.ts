import { Usercreate, Users } from '@interface/users.interface';
import UsersService from '@provider/users.service';
declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(body: Usercreate): Promise<any>;
    update(body: Users, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default UsersController;
