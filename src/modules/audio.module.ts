import { Module } from '@nestjs/common';
import AudioController from '@controller/audio.controller';
import AudioService from '@provider/audio.service';

@Module({
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}
