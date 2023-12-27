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
let VentService = class VentService {
    constructor() {
        this.vents = [];
        this.ventresult = {
            message: '',
            result: null,
        };
        this.ventresultcount = {
            message: '',
            count: 0,
            result: null,
        };
    }
    isdelete_check(data) {
        return data.is_delete == true ? true : false;
    }
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const VentsRef = db.collection('Vent');
        const doc = await VentsRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.vents.length = 0;
            doc.docs.map((element) => {
                console.log(element.data());
                this.vents.push({
                    id: element.id,
                    vent_content: element.data().vent_content,
                    owner: element.data().owner,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                    is_delete: element.data().is_delete,
                });
                this.ventresult.message = 'Ok';
                this.ventresult.result = this.vents;
            });
        }
        return this.ventresult;
    }
    async findCount() {
        const db = (0, firestore_1.getFirestore)();
        const VentsRef = db.collection('Vent');
        const doc = await VentsRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.vents.length = 0;
            doc.docs.map((element) => {
                if (this.isdelete_check(element.data())) {
                    this.ventresultcount.message = 'Document doesnt exist';
                    this.ventresultcount.result = [];
                }
                else {
                    this.vents.push({
                        id: element.id,
                        vent_content: element.data().vent_content,
                        owner: element.data().owner,
                        create_at: element.data().create_at,
                        update_at: element.data().update_at,
                        is_delete: element.data().is_delete,
                    });
                    this.ventresultcount.message = 'Ok';
                    this.ventresultcount.count = this.vents.length;
                    this.ventresultcount.result = this.vents;
                }
            });
        }
        return this.ventresultcount;
    }
    async findOne(id) {
        const db = (0, firestore_1.getFirestore)();
        const VentsRef = db.collection('Vent');
        const ventone = await VentsRef.doc(id).get();
        if (ventone == null || this.isdelete_check(ventone.data())) {
            this.ventresult.message = 'Document doesnt exist';
            this.ventresult.result = [];
        }
        else {
            this.vents.length = 0;
            this.vents.push({
                id: ventone.id,
                vent_content: ventone.data().vent_content,
                owner: ventone.data().owner,
                create_at: ventone.data().create_at,
                update_at: ventone.data().update_at,
                is_delete: ventone.data().is_delete,
            });
            this.ventresult.message = 'Ok';
            this.ventresult.result = this.vents;
        }
        return this.ventresult;
    }
    async findOwner(email) {
        const db = (0, firestore_1.getFirestore)();
        const VentsRef = db.collection('Vent');
        const vents = (await VentsRef.where(firestore_1.Filter.and(firestore_1.Filter.where('owner', '==', email), firestore_1.Filter.where('is_delete', '==', false)))
            .orderBy('update_at', 'desc')
            .get()).docs;
        this.vents.length = 0;
        vents.map((element) => {
            this.vents.push({
                id: element.id,
                vent_content: element.data().vent_content,
                owner: element.data().owner,
                create_at: element.data().create_at,
                update_at: element.data().update_at,
                is_delete: element.data().is_delete,
            });
        });
        this.ventresult.message = 'Ok';
        this.ventresult.result = this.vents;
        return this.ventresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Vent')
            .add({
            vent_content: body.vent_content,
            owner: body.owner,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            update_at: firebase_admin_1.firestore.Timestamp.now(),
            is_delete: false,
        })
            .then(() => {
            this.ventresult.message = 'Successfully Created';
            this.ventresult.result = {
                vent_content: body.vent_content,
                owner: body.owner,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
                update_at: firebase_admin_1.firestore.Timestamp.now(),
                is_delete: false,
            };
        })
            .catch((error) => {
            this.ventresult.message = error.code;
            this.ventresult.result = [];
        });
        return this.ventresult;
    }
    async update(body, id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Vent')
            .doc(id)
            .update({
            vent_content: body.vent_content,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(async () => {
            const ventone = await db.collection('Vent').doc(id).get();
            this.ventresult.message = 'Successfully Updated';
            this.ventresult.result = {
                id: ventone.id,
                vent_content: ventone.data().vent_content,
                owner: ventone.data().owner,
                create_at: ventone.data().create_at,
                update_at: ventone.data().update_at,
                is_delete: ventone.data().is_delete,
            };
        })
            .catch((error) => {
            this.ventresult.message = error.code;
            this.ventresult.result = [];
        });
        return this.ventresult;
    }
    async delete(id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Vent')
            .doc(id)
            .update({
            is_delete: true,
        })
            .then(() => {
            this.ventresult.message = 'Successfully Deleted';
            this.ventresult.result = [];
        })
            .catch((error) => {
            this.ventresult.message = error.code;
            this.ventresult.result = [];
        });
        return this.ventresult;
    }
};
VentService = __decorate([
    (0, common_1.Injectable)()
], VentService);
exports.default = VentService;
//# sourceMappingURL=vent.service.js.map