import { Audio } from '@interface/audio.interface';
import AudioService from '@provider/audio.service';
declare class AudioController {
    private readonly audioService;
    constructor(audioService: AudioService);
    findOne(owner: string): Promise<any>;
    create(body: Audio): Promise<any>;
    update(body: Audio, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default AudioController;
