import VentChoiceService from '@provider/vent_choice.service';
import { VentChoice } from '@interface/vent_choice.interface';
declare class VentChoiceController {
    private readonly ventChoiceService;
    constructor(ventChoiceService: VentChoiceService);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    create(body: VentChoice): Promise<any>;
    update(body: VentChoice, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default VentChoiceController;
