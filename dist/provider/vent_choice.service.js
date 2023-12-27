"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
let VentChoiceService = class VentChoiceService {
    constructor() {
        this.ventchoice = [];
        this.ventchoiceresultcount = {
            message: '',
            count: 0,
            result: null,
        };
        this.ventchoiceresult = {
            message: '',
            result: null,
        };
    }
    async findOne(id) {
        const Oneventchoice = async (id) => {
            this.ventchoice.length = 0;
            const db = (0, firestore_1.getFirestore)();
            const VentsRef = db.collection('VentChoice');
            const ventone = await VentsRef.doc(id).get();
            this.ventchoice.length = 0;
            this.ventchoice.push({
                id: ventone.id,
                choice: ventone.data().choice,
                create_at: ventone.data().create_at,
                update_at: ventone.data().update_at,
            });
            this.ventchoiceresult.message = 'Ok';
            this.ventchoiceresult.result = this.ventchoice;
        };
        await Oneventchoice(id);
        return this.ventchoiceresult;
    }
    async findAll() {
        const listAllventchoice = async () => {
            const db = (0, firestore_1.getFirestore)();
            const VentsRef = db.collection('VentChoice');
            const doc = await VentsRef.get();
            if (doc.empty) {
                console.log('Document is Empty');
            }
            else {
                this.ventchoice.length = 0;
                doc.docs.map((element) => {
                    console.log(element.data());
                    this.ventchoice.push({
                        id: element.id,
                        choice: element.data().choice,
                        create_at: element.data().create_at,
                        update_at: element.data().update_at,
                    });
                    this.ventchoiceresult.message = 'Ok';
                    this.ventchoiceresult.result = this.ventchoice;
                });
            }
            return this.ventchoiceresult;
        };
        await listAllventchoice();
        return this.ventchoiceresult;
    }
    async findCount() {
        const listAllventchoice = async () => {
            this.ventchoice.length = 0;
            const db = (0, firestore_1.getFirestore)();
            const VentsRef = db.collection('VentChoice');
            const doc = await VentsRef.get();
            if (doc.empty) {
                console.log('Document is Empty');
            }
            else {
                this.ventchoice.length = 0;
                doc.docs.map((element) => {
                    this.ventchoice.push({
                        id: element.id,
                        choice: element.data().choice,
                        create_at: element.data().create_at,
                        update_at: element.data().update_at,
                    });
                    this.ventchoiceresultcount.message = 'Ok';
                    this.ventchoiceresultcount.count = this.ventchoice.length;
                    this.ventchoiceresultcount.result = this.ventchoice;
                });
            }
            return this.ventchoiceresultcount;
        };
        await listAllventchoice();
        return this.ventchoiceresultcount;
    }
    async create(body) {
        this.ventchoice.length = 0;
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('VentChoice')
            .add({
            choice: body.choice,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.ventchoiceresult.message = 'Successfully Created';
            this.ventchoiceresult.result = {
                choice: body.choice,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
                update_at: firebase_admin_1.firestore.Timestamp.now(),
            };
        })
            .catch((error) => {
            this.ventchoiceresult.message = error.code;
            this.ventchoiceresult.result = [];
        });
        return this.ventchoiceresult;
    }
    async update(body, id) {
        this.ventchoice.length = 0;
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('VentChoice')
            .doc(id)
            .update({
            choice: body.choice,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(async () => {
            const ventone = await db.collection('VentChoice').doc(id).get();
            this.ventchoiceresult.message = 'Successfully Updated';
            this.ventchoiceresult.result = {
                id: ventone.id,
                choice: ventone.data().choice,
                create_at: ventone.data().create_at,
                update_at: ventone.data().update_at,
            };
        })
            .catch((error) => {
            this.ventchoiceresult.message = error.code;
            this.ventchoiceresult.result = [];
        });
        return this.ventchoiceresult;
    }
    async delete(id) {
        this.ventchoice.length = 0;
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('VentChoice')
            .doc(id)
            .delete()
            .then(() => {
            this.ventchoiceresult.message = 'Successfully Deleted';
            this.ventchoiceresult.result = [];
        })
            .catch((error) => {
            this.ventchoiceresult.message = error.code;
            this.ventchoiceresult.result = [];
        });
        return this.ventchoiceresult;
    }
};
VentChoiceService = __decorate([
    (0, common_1.Injectable)()
], VentChoiceService);
exports.default = VentChoiceService;
//# sourceMappingURL=vent_choice.service.js.map