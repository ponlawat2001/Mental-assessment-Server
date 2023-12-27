import { Avatar } from '@interface/avatar.interface';
import AvatarService from '@provider/avatar.service';
declare class AvatarController {
    private readonly avatarService;
    constructor(avatarService: AvatarService);
    findOne(email: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(body: Avatar): Promise<any>;
    update(body: Avatar, id: string): Promise<any>;
}
export default AvatarController;
