import { Module } from '@nestjs/common';
import VentChoiceController from '@controller/vent_choice.controller';
import VentChoiceService from '@provider/vent_choice.service';

@Module({
  controllers: [VentChoiceController],
  providers: [VentChoiceService],
})
export class VentChoiceModule {}
