"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
(0, common_1.Injectable)();
class AssessmentService {
    constructor() {
        this.assessment = [];
        this.assessmentresult = {
            message: '',
            result: null,
        };
    }
    async findAll() {
        const db = (0, firestore_1.getFirestore)();
        const AssessmentRef = db
            .collection('Assessment')
            .where('is_delete', '==', false)
            .orderBy('update_at', 'desc');
        const doc = await AssessmentRef.get();
        this.assessment.length = 0;
        if (doc.empty) {
            console.log('Document is Empty');
            this.assessmentresult.message = 'Document is Empty';
            this.assessmentresult.result = [];
        }
        else {
            doc.docs.map((element) => {
                this.assessment.push({
                    id: element.id,
                    name: element.data().name,
                    description: element.data().description,
                    type: element.data().type,
                    questionnaire: element.data().questionnaire,
                    answer: element.data().answer,
                    scorerate: element.data().scorerate,
                    advise: element.data().advise,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                    is_delete: element.data().is_delete,
                });
                this.assessmentresult.message = 'Ok';
                this.assessmentresult.result = this.assessment;
            });
        }
        return this.assessmentresult;
    }
    async findMain() {
        const db = (0, firestore_1.getFirestore)();
        const AssessmentRef = db
            .collection('Assessment')
            .where(firestore_1.Filter.and(firestore_1.Filter.where('type', '==', 'main'), firestore_1.Filter.where('is_delete', '==', false)))
            .orderBy('update_at', 'desc');
        const doc = await AssessmentRef.get();
        this.assessment.length = 0;
        if (doc.empty) {
            console.log('Document is Empty');
            this.assessmentresult.message = 'Document is Empty';
            this.assessmentresult.result = [];
        }
        else {
            doc.docs.map((element) => {
                this.assessment.push({
                    id: element.id,
                    name: element.data().name,
                    type: element.data().type,
                    description: element.data().description,
                    questionnaire: element.data().questionnaire,
                    answer: element.data().answer,
                    scorerate: element.data().scorerate,
                    advise: element.data().advise,
                    create_at: element.data().create_at,
                    update_at: element.data().update_at,
                    is_delete: element.data().is_delete,
                });
                this.assessmentresult.message = 'Ok';
                this.assessmentresult.result = this.assessment;
            });
        }
        return this.assessmentresult;
    }
    async findOne(id) {
        const db = (0, firestore_1.getFirestore)();
        const AssessmentRef = db.collection('Assessment').doc(id);
        const doc = await AssessmentRef.get();
        if (doc == null) {
            console.log('Document is Empty');
            this.assessmentresult.message = 'Document is Empty';
            this.assessmentresult.result = [];
        }
        else {
            this.assessment.length = 0;
            this.assessment.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                type: doc.data().type,
                questionnaire: doc.data().questionnaire,
                answer: doc.data().answer,
                scorerate: doc.data().scorerate,
                advise: doc.data().advise,
                create_at: doc.data().create_at,
                update_at: doc.data().update_at,
                is_delete: doc.data().is_delete,
            });
            this.assessmentresult.message = 'Ok';
            this.assessmentresult.result = this.assessment;
        }
        return this.assessmentresult;
    }
    async update(body, id) {
        this.assessment.length = 0;
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Assessment')
            .doc(id)
            .update({
            name: body.name,
            description: body.description,
            questionnaire: body.questionnaire,
            answer: body.answer,
            scorerate: body.scorerate,
            advise: body.advise,
            update_at: firebase_admin_1.firestore.Timestamp.now(),
        })
            .then(() => {
            this.assessmentresult.message = 'Successfully Updated';
            this.assessmentresult.result = [];
        })
            .catch((error) => {
            this.assessmentresult.message = error;
            this.assessmentresult.result = null;
        });
        return this.assessmentresult;
    }
    async delete(id) {
        this.assessment.length = 0;
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Assessment')
            .doc(id)
            .update({
            is_delete: true,
        })
            .then(() => {
            this.assessmentresult.message = 'Successfully Delete';
            this.assessmentresult.result = [];
        })
            .catch((error) => {
            this.assessmentresult.message = error;
            this.assessmentresult.result = null;
        });
        return this.assessmentresult;
    }
    async create(body) {
        const db = (0, firestore_1.getFirestore)();
        await db
            .collection('Assessment')
            .add({
            name: body.name,
            type: body.type,
            description: body.description,
            questionnaire: body.questionnaire,
            answer: body.answer,
            scorerate: body.scorerate,
            advise: body.advise,
            create_at: firebase_admin_1.firestore.Timestamp.now(),
            update_at: firebase_admin_1.firestore.Timestamp.now(),
            is_delete: false,
        })
            .then(() => {
            this.assessmentresult.message = 'Successfully Created';
            this.assessmentresult.result = {
                name: body.name,
                description: body.description,
                questionnaire: body.questionnaire,
                answer: body.answer,
                scorerate: body.scorerate,
                advise: body.advise,
                create_at: firebase_admin_1.firestore.Timestamp.now(),
                update_at: firebase_admin_1.firestore.Timestamp.now(),
                is_delete: false,
            };
        })
            .catch((error) => {
            this.assessmentresult.message = error.code;
            this.assessmentresult.result = [];
        });
        return this.assessmentresult;
    }
}
exports.default = AssessmentService;
//# sourceMappingURL=assessment.service.js.map