import { Module } from '@nestjs/common';
import VentController from '@controller/vent.controller';
import VentService from '@provider/vent.service';

@Module({
  controllers: [VentController],
  providers: [VentService],
})
export class VentModule {}
