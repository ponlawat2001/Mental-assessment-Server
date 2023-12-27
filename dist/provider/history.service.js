"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
(0, common_1.Injectable)();
class HistoryService {
    constructor() {
        this.history = [];
        this.historyresult = {
            message: '',
            result: null,
        };
    }
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const HistoryRef = db.collection('History').orderBy('create_at', 'desc');
        const doc = await HistoryRef.get();
        this.history.length = 0;
        if (doc.empty) {
            console.log('Document is Empty');
            this.historyresult.message = 'Document is Empty';
            this.historyresult.result = [];
        }
        else {
            doc.docs.map((element) => {
                this.history.push({
                    id: element.id,
                    owner: element.data().owner,
                    type: element.data().type,
                    summary: element.data().summary,
                    create_at: element.data().create_at,
                });
                this.historyresult.message = 'Ok';
                this.historyresult.result = this.history;
            });
        }
        return this.historyresult;
    }
    async findOwner(owner) {
        const db = (0, firestore_1.getFirestore)();
        const HistoryRef = db.collection('History');
        await HistoryRef.where(firestore_1.Filter.and(firestore_1.Filter.where('owner', '==', owner)))
            .orderBy('create_at', 'desc')
            .get()
            .then((element) => {
            this.history.length = 0;
            element.forEach((element) => {
                this.history.push({
                    id: element.id,
                    owner: element.data().owner,
                    type: element.data().type,
                    summary: element.data().summary,
                    create_at: element.data().create_at,
                });
            });
            this.historyresult.message = 'Ok';
            this.historyresult.result = this.history;
            return this.historyresult;
        })
            .catch(() => {
            console.log('Document is Empty');
            this.historyresult.message = 'Document is Empty';
            this.historyresult.result = null;
            return this.historyresult;
        });
        return this.historyresult;
    }
    async findOne(id) {
        const db = (0, firestore_1.getFirestore)();
        const HistoryRef = db.collection('History').doc(id);
        const doc = await HistoryRef.get();
        if (doc == null) {
            console.log('Document is Empty');
            this.historyresult.message = 'Document is Empty';
            this.historyresult.result = [];
        }
        else {
            this.history.length = 0;
            this.history.push({
                id: doc.id,
                owner: doc.data().owner,
                type: doc.data().type,
                summary: doc.data().summary,
                create_at: doc.data().create_at,
            });
            this.historyresult.message = 'Ok';
            this.historyresult.result = this.history;
        }
        return this.historyresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('History')
            .add({
            type: body.type,
            owner: body.owner,
            summary: body.summary,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then((res) => {
            this.historyresult.message = 'Successfully Created';
            this.historyresult.result = {
                id: res.id,
                type: body.type,
                owner: body.owner,
                summary: body.summary,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
            };
        })
            .catch((error) => {
            this.historyresult.message = error.code;
            this.historyresult.result = [];
        });
        return this.historyresult;
    }
}
exports.default = HistoryService;
//# sourceMappingURL=history.service.js.map