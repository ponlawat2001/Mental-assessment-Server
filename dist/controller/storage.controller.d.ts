/// <reference types="multer" />
import StorageService from '@provider/storage.service';
declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    findOneAudio(id: string): Promise<any>;
    findOneImage(id: string): Promise<any>;
    uploadAudio(audio: Express.Multer.File): Promise<any>;
    uploadImage(image: Express.Multer.File): Promise<any>;
}
export default StorageController;
