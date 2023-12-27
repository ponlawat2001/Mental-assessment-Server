import { Assessment } from '@interface/assessment.interface';
import AssessmentService from '@provider/assessment.service';
declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findMain(): Promise<any>;
    create(body: Assessment): Promise<any>;
    update(body: Assessment, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default AssessmentController;
