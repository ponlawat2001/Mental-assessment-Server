import { Vent, Ventresult } from '@interface/vent.interface';
declare class VentService {
    private vents;
    private ventresult;
    private ventresultcount;
    private isdelete_check;
    findAll(): Promise<any>;
    findCount(): Promise<any>;
    findOne(id: string): Promise<any>;
    findOwner(email: string): Promise<Ventresult>;
    create(body: Vent): Promise<any>;
    update(body: Vent, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default VentService;
