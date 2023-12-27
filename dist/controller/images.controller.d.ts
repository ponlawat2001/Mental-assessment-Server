import { Images } from '@interface/images.interface';
import ImagesService from '@provider/images.service';
declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    findOne(owner: string): Promise<any>;
    create(body: Images): Promise<any>;
    update(body: Images, id: string): Promise<any>;
}
export default ImagesController;
