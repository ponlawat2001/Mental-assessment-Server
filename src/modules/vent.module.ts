import { Module } from '@nestjs/common';
import VentController from 'src/controller/vent.controller';
import VentService from 'src/provider/vent.service';

@Module({
  controllers: [VentController],
  providers: [VentService],
})
export class VentModule {}
