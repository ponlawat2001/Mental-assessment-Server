"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
const firestore_1 = require("firebase-admin/firestore");
(0, common_1.Injectable)();
class ImagesService {
    constructor() {
        this.images = [];
        this.imagesresult = {
            message: '',
            result: null,
        };
    }
    async findOwner(owner) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Images')
            .where('owner', '==', owner)
            .get()
            .then((element) => {
            this.images.length = 0;
            element.forEach((element) => {
                this.images.push({
                    id: element.id,
                    owner: element.data().owner,
                    imageUrl: element.data().imageUrl,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                });
            });
            this.imagesresult.message = 'Ok';
            this.imagesresult.result = this.images;
            return this.imagesresult;
        })
            .catch(() => {
            console.log('Document is Empty');
            this.imagesresult.message = 'Document is Empty';
            this.imagesresult.result = [
                {
                    owner: '',
                    imageUrl: '',
                },
            ];
            return this.imagesresult;
        });
        return this.imagesresult;
    }
    async update(body, id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Images')
            .doc(id)
            .update({
            imageUrl: body.imageUrl,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.imagesresult.message = 'Successfully Updated';
            this.imagesresult.result = [];
        })
            .catch((error) => {
            this.imagesresult.message = error;
            this.imagesresult.result = [];
        });
        return this.imagesresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Images')
            .add({
            owner: body.owner,
            imageUrl: body.imageUrl,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.imagesresult.message = 'Successfully Created';
            this.imagesresult.result = {
                owner: body.owner,
                imageUrl: body.imageUrl,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
                update_at: firebase_admin_1.firestore.Timestamp.now(),
            };
        })
            .catch((error) => {
            this.imagesresult.message = error.code;
            this.imagesresult.result = [];
        });
        return this.imagesresult;
    }
}
exports.default = ImagesService;
//# sourceMappingURL=images.service.js.map