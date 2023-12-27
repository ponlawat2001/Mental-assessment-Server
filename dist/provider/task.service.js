"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
(0, common_1.Injectable)();
class TaskService {
    constructor() {
        this.task = [];
        this.taskresult = {
            message: '',
            result: null,
        };
    }
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const taskRef = db.collection('Task').orderBy('create_at', 'desc');
        const doc = await taskRef.get();
        this.task.length = 0;
        if (doc.empty) {
            console.log('Document is Empty');
            this.taskresult.message = 'Document is Empty';
            this.taskresult.result = [];
        }
        else {
            doc.docs.map((element) => {
                this.task.push({
                    id: element.id,
                    owner: element.data().owner,
                    type: element.data().type,
                    summary: element.data().summary,
                    create_at: element.data().create_at,
                });
                this.taskresult.message = 'Ok';
                this.taskresult.result = this.task;
            });
        }
        return this.taskresult;
    }
    async findOwner(owner) {
        const db = (0, firestore_1.getFirestore)();
        const taskRef = db.collection('Task');
        await taskRef
            .where(firestore_1.Filter.and(firestore_1.Filter.where('owner', '==', owner)))
            .orderBy('create_at', 'desc')
            .get()
            .then((element) => {
            this.task.length = 0;
            element.forEach((element) => {
                this.task.push({
                    id: element.id,
                    owner: element.data().owner,
                    type: element.data().type,
                    summary: element.data().summary,
                    create_at: element.data().create_at,
                });
            });
            this.taskresult.message = 'Ok';
            this.taskresult.result = this.task;
            return this.taskresult;
        })
            .catch(() => {
            console.log('Document is Empty');
            this.taskresult.message = 'Document is Empty';
            this.taskresult.result = null;
            return this.taskresult;
        });
        return this.taskresult;
    }
    async findOne(id) {
        const db = (0, firestore_1.getFirestore)();
        const taskRef = db.collection('Task').doc(id);
        const doc = await taskRef.get();
        if (doc == null) {
            console.log('Document is Empty');
            this.taskresult.message = 'Document is Empty';
            this.taskresult.result = [];
        }
        else {
            this.task.length = 0;
            this.task.push({
                id: doc.id,
                owner: doc.data().owner,
                type: doc.data().type,
                summary: doc.data().summary,
                create_at: doc.data().create_at,
            });
            this.taskresult.message = 'Ok';
            this.taskresult.result = this.task;
        }
        return this.taskresult;
    }
    async update(id, body) {
        const db = (0, firestore_1.getFirestore)();
        console.log(id);
        await db
            .collection('Task')
            .doc(id)
            .update({
            summary: body.summary,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.taskresult.message = 'Successfully Created';
            this.taskresult.result = {
                summary: body.summary,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
            };
        })
            .catch((error) => {
            console.log(error);
            this.taskresult.message = error.code;
            this.taskresult.result = [];
        });
        return this.taskresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Task')
            .add({
            type: body.type,
            owner: body.owner,
            summary: body.summary,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then((res) => {
            this.taskresult.message = 'Successfully Created';
            this.taskresult.result = {
                id: res.id,
                type: body.type,
                owner: body.owner,
                summary: body.summary,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
            };
        })
            .catch((error) => {
            this.taskresult.message = error.code;
            this.taskresult.result = [];
        });
        return this.taskresult;
    }
    async delete(id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Task')
            .doc(id)
            .delete()
            .then(() => {
            this.taskresult.message = 'Delete Successfully';
            this.taskresult.result = [];
        })
            .catch((error) => {
            this.taskresult.message = error.code;
            this.taskresult.result = [];
        });
        return this.taskresult;
    }
}
exports.default = TaskService;
//# sourceMappingURL=task.service.js.map