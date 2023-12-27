"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
const firestore_1 = require("firebase-admin/firestore");
(0, common_1.Injectable)();
class AudioService {
    constructor() {
        this.audio = [];
        this.audioresult = {
            message: '',
            result: null,
        };
    }
    async findOwner(owner) {
        const db = (0, firestore_1.getFirestore)();
        const VentsRef = db.collection('Audio');
        await VentsRef.where(firestore_1.Filter.and(firestore_1.Filter.where('owner', '==', owner), firestore_1.Filter.where('is_delete', '==', false)))
            .orderBy('update_at', 'desc')
            .get()
            .then((element) => {
            this.audio.length = 0;
            element.forEach((element) => {
                this.audio.push({
                    id: element.id,
                    owner: element.data().owner,
                    audioUrl: element.data().audioUrl,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                    is_delete: element.data().is_delete,
                });
            });
            this.audioresult.message = 'Ok';
            this.audioresult.result = this.audio;
            return this.audioresult;
        })
            .catch(() => {
            console.log('Document is Empty');
            this.audioresult.message = 'Document is Empty';
            this.audioresult.result = null;
            return this.audioresult;
        });
        return this.audioresult;
    }
    async update(body, id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Audio')
            .doc(id)
            .update({
            imageUrl: body.audioUrl,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.audioresult.message = 'Successfully Updated';
            this.audioresult.result = [];
        })
            .catch((error) => {
            this.audioresult.message = error;
            this.audioresult.result = null;
        });
        return this.audioresult;
    }
    async delete(id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Audio')
            .doc(id)
            .update({
            is_delete: true,
        })
            .then(() => {
            this.audioresult.message = 'Successfully Deleted!';
            this.audioresult.result = [];
        })
            .catch((error) => {
            this.audioresult.message = error;
            this.audioresult.result = [];
        });
        return this.audioresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Audio')
            .add({
            owner: body.owner,
            audioUrl: body.audioUrl,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            update_at: firebase_admin_1.firestore.Timestamp.now(),
            is_delete: false,
        })
            .then(() => {
            this.audioresult.message = 'Successfully Created';
            this.audioresult.result = {
                owner: body.owner,
                audioUrl: body.audioUrl,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
                update_at: firebase_admin_1.firestore.Timestamp.now(),
                is_delete: false,
            };
        })
            .catch((error) => {
            this.audioresult.message = error.code;
            this.audioresult.result = [];
        });
        return this.audioresult;
    }
}
exports.default = AudioService;
//# sourceMappingURL=audio.service.js.map