"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
let StorageService = class StorageService {
    constructor() {
        this.storage = [];
        this.oneYearMilliseconds = 24 * 60 * 60 * 1000 * 365;
        this.storageresult = {
            message: '',
            result: null,
        };
    }
    async findOne(id, isimage) {
        var downloadUrl;
        var file;
        const bucket = firebase_admin_1.default.storage().bucket();
        if (!isimage) {
            file = bucket.file(`AudioRecord/${id}`);
        }
        else {
            file = bucket.file(`Images/${id}`);
        }
        const exists = await file.exists();
        if (exists[0]) {
            downloadUrl = await file.getSignedUrl({
                action: 'read',
                expires: Date.now() + this.oneYearMilliseconds,
            });
            this.storageresult.message = 'Ok';
            this.storageresult.result = downloadUrl;
        }
        else {
            this.storageresult.message = 'File not found';
            this.storageresult.result = null;
        }
        return this.storageresult;
    }
    async upload(file, isimage) {
        var filePath;
        const bucket = firebase_admin_1.default.storage().bucket();
        if (!isimage) {
            filePath = `AudioRecord/${Date.now()}_${file.originalname}`;
        }
        else {
            filePath = `Images/${Date.now()}_${file.originalname}`;
        }
        const fileUpload = bucket.file(filePath);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        stream.on('error', (error) => {
            console.error(error);
            throw new Error('Error uploading file to Firebase Storage');
        });
        stream.on('finish', async () => {
            console.log(`File uploaded to: ${filePath}`);
        });
        const downloadUrl = await fileUpload.getSignedUrl({
            action: 'read',
            expires: Date.now() + this.oneYearMilliseconds,
        });
        stream.end(file.buffer);
        this.storageresult.message = 'ok';
        this.storageresult.result = downloadUrl;
        return this.storageresult;
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)()
], StorageService);
exports.default = StorageService;
//# sourceMappingURL=storage.service.js.map