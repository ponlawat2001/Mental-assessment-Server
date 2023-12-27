import { VentChoice } from '@interface/vent_choice.interface';
declare class VentChoiceService {
    private readonly ventchoice;
    private ventchoiceresultcount;
    private ventchoiceresult;
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(body: VentChoice): Promise<{
        message: string;
        result: any;
    }>;
    update(body: VentChoice, id: string): Promise<{
        message: string;
        result: any;
    }>;
    delete(id: string): Promise<{
        message: string;
        result: any;
    }>;
}
export default VentChoiceService;
