"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
const firestore_1 = require("firebase-admin/firestore");
(0, common_1.Injectable)();
class AvatarService {
    constructor() {
        this.avatar = [];
        this.avatarresultcount = {
            message: '',
            count: 0,
            result: null,
        };
        this.avatarresult = {
            message: '',
            result: null,
        };
    }
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const AvatarRef = db.collection('Avatars');
        const doc = await AvatarRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.avatar.length = 0;
            doc.docs.map((element) => {
                this.avatar.push({
                    id: element.id,
                    email: element.data().email,
                    avatar: element.data().avatar,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                });
                this.avatarresult.message = 'Ok';
                this.avatarresult.result = this.avatar;
            });
        }
        return this.avatarresult;
    }
    async findCount() {
        const db = (0, firestore_1.getFirestore)();
        const AvatarRef = db.collection('Avatars');
        const doc = await AvatarRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.avatar.length = 0;
            doc.docs.map((element) => {
                this.avatar.push({
                    id: element.id,
                    email: element.data().email,
                    avatar: element.data().avatar,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                });
                this.avatarresultcount.message = 'Ok';
                this.avatarresultcount.count = this.avatar.length;
                this.avatarresultcount.result = this.avatar;
            });
        }
        return this.avatarresultcount;
    }
    async findOne(email) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Avatars')
            .where('email', '==', email)
            .get()
            .then((element) => {
            this.avatar.length = 0;
            element.forEach((element) => {
                this.avatar.push({
                    id: element.id,
                    email: element.data().email,
                    avatar: element.data().avatar,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                });
            });
            this.avatarresult.message = 'Ok';
            this.avatarresult.result = this.avatar;
            return this.avatarresult;
        })
            .catch(() => {
            console.log('Document is Empty');
            this.avatarresult.message = 'Document is Empty';
            this.avatarresult.result = [
                {
                    email: '',
                    avatar: '',
                },
            ];
            return this.avatarresult;
        });
        return this.avatarresult;
    }
    async update(body, id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Avatars')
            .doc(id)
            .update({
            avatar: body.avatar,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.avatarresult.message = 'Successfully Updated';
            this.avatarresult.result = [];
        })
            .catch((error) => {
            this.avatarresult.message = error;
            this.avatarresult.result = [];
        });
        return this.avatarresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Avatars')
            .add({
            avatar: body.avatar,
            email: body.email,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.avatarresult.message = 'Successfully Created';
            this.avatarresult.result = {
                avatar: body.avatar,
                email: body.email,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
                update_at: firebase_admin_1.firestore.Timestamp.now(),
            };
        })
            .catch((error) => {
            this.avatarresult.message = error.code;
            this.avatarresult.result = [];
        });
        return this.avatarresult;
    }
}
exports.default = AvatarService;
//# sourceMappingURL=avatar.service.js.map