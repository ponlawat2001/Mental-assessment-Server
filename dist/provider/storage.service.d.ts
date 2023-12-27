/// <reference types="multer" />
declare class StorageService {
    private readonly storage;
    private readonly oneYearMilliseconds;
    private storageresult;
    findOne(id: string, isimage: boolean): Promise<any>;
    upload(file: Express.Multer.File, isimage: boolean): Promise<any>;
}
export default StorageService;
