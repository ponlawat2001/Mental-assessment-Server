import { Assessment } from '@interface/assessment.interface';
declare class AssessmentService {
    private readonly assessment;
    private assessmentresult;
    findAll(): Promise<any>;
    findMain(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(body: Assessment, id: string): Promise<any>;
    delete(id: string): Promise<any>;
    create(body: Assessment): Promise<{
        message: string;
        result: any;
    }>;
}
export default AssessmentService;
