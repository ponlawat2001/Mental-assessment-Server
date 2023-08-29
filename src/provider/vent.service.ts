import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import {
  Vent,
  Ventresult,
  Ventresultcount,
} from 'src/interface/vent.interface';
@Injectable()
class ventService {
  private vents: Vent[] = [];
  private ventresult: Ventresult;
  private ventresultcount: Ventresultcount;

  private isdelete_check(data: any) {
    return data.is_delete == true ? true : false;
  }

  async findAll(): Promise<any> {
    const db = getFirestore();
    const VentsRef = db.collection('Vent');
    const doc = await VentsRef.get();
    if (doc.empty) {
      console.log('Document is Empty');
    } else {
      this.vents.length = 0;
      doc.docs.map((element) => {
        if (this.isdelete_check(element.data())) {
          this.ventresult.message = 'Document doesnt exist';
          this.ventresult.result = [];
        } else {
          this.vents.push({
            id: element.id,
            vent_content: element.data().vent_content,
            owner: element.data().owner,
            create_at: element.data().create_at,
            update_at: element.data().update_at,
            is_delete: element.data().is_delete,
          });
          this.ventresult.message = 'Ok';
          this.ventresult.result = this.ventresult;
        }
      });
    }
    return this.ventresult;
  }
}
