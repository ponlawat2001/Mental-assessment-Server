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
let ContactService = class ContactService {
    constructor() {
        this.contact = [];
        this.contactresult = {
            message: '',
            result: null,
        };
    }
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const NewsRef = db.collection('Contact');
        const doc = await NewsRef.get();
        if (doc.empty) {
            console.log('Document is Empty');
        }
        else {
            this.contact.length = 0;
            doc.docs.map((element) => {
                this.contact.push({
                    id: element.id,
                    name_contact: element.data().name_contact,
                    image_contact: element.data().image_contact,
                    location_contact: element.data().location_contact,
                    email_contact: element.data().email_contact,
                    facebook_contact: element.data().facebook_contact,
                    line_contact: element.data().line_contact,
                    phone_contact: element.data().phone_contact,
                    update_at: element.data().update_at,
                });
                this.contactresult.message = 'Ok';
                this.contactresult.result = this.contact;
            });
        }
        return this.contactresult;
    }
    async update(body, id) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Contact')
            .doc(id)
            .update({
            name_contact: body.name_contact,
            location_contact: body.location_contact,
            image_contact: body.image_contact,
            email_contact: body.email_contact,
            line_contact: body.line_contact,
            facebook_contact: body.facebook_contact,
            phone_contact: body.phone_contact,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.contactresult.message = 'Successfully Updated';
            this.contactresult.result = [];
        })
            .catch((error) => {
            this.contactresult.message = error.code;
            this.contactresult.result = [];
        });
        return this.contactresult;
    }
};
ContactService = __decorate([
    (0, common_1.Injectable)()
], ContactService);
exports.default = ContactService;
//# sourceMappingURL=contact.service.js.map