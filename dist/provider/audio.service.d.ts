import { Audio } from '@interface/audio.interface';
declare class AudioService {
    private readonly audio;
    private audioresult;
    findOwner(owner: string): Promise<any>;
    update(body: Audio, id: string): Promise<any>;
    delete(id: string): Promise<any>;
    create(body: Audio): Promise<{
        message: string;
        result: any;
    }>;
}
export default AudioService;
