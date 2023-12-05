import { Injectable } from '@nestjs/common';
import { Audio } from '@interface/audio.interface';
import { Assessment } from '@interface/assessment.interface';
import { Filter, getFirestore } from 'firebase-admin/firestore';

Injectable();
class AssessmentService {
  private readonly assessment: Assessment[] = [];
  private assessmentresult = {
    message: '',
    result: null,
  };

  async findAll(): Promise<any> {
    const db = getFirestore();
    const AssessmentRef = db
      .collection('Assessment')
      .where(Filter.where('is_delete', '==', false))
      .orderBy('create_at', 'desc');
    const doc = await AssessmentRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.assessment.length = 0;
      doc.docs.map((element) => {
        this.assessment.push({
          id: element.id,
          name: element.data().name,
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

  async findOne(id: string): Promise<any> {
    return this.assessmentresult;
  }

  async update(body: Audio, id: string): Promise<any> {
    return this.assessmentresult;
  }

  async delete(id: string): Promise<any> {
    return this.assessmentresult;
  }

  async create(body: Audio) {
    return this.assessmentresult;
  }
}

export default AssessmentService;
