import { Avatar } from '@interface/avatar.interface';
declare class AvatarService {
    private readonly avatar;
    private avatarresultcount;
    private avatarresult;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    findOne(email: string): Promise<any>;
    update(body: Avatar, id: string): Promise<any>;
    create(body: Avatar): Promise<{
        message: string;
        result: any;
    }>;
}
export default AvatarService;
