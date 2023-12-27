import { Vent } from '@interface/vent.interface';
import VentService from '@provider/vent.service';
declare class VentController {
    private ventService;
    constructor(ventService: VentService);
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    findOne(id: string): Promise<any>;
    findOwner(email: string): Promise<any>;
    create(body: Vent): Promise<any>;
    update(body: Vent, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default VentController;
