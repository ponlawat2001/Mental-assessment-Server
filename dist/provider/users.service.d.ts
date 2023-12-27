import { Users } from '@interface/users.interface';
declare class UsersService {
    private readonly users;
    private usersresultcount;
    private usersresult;
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(email: string, password: string): Promise<{
        message: string;
        result: any;
    }>;
    update(body: Users, uid: string): Promise<{
        message: string;
        result: any;
    }>;
    delete(id: string): Promise<{
        message: string;
        result: any;
    }>;
}
export default UsersService;
