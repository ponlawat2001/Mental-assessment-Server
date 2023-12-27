import { Images } from '@interface/images.interface';
declare class ImagesService {
    private readonly images;
    private imagesresult;
    findOwner(owner: string): Promise<any>;
    update(body: Images, id: string): Promise<any>;
    create(body: Images): Promise<{
        message: string;
        result: any;
    }>;
}
export default ImagesService;
