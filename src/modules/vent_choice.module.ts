import { Module } from '@nestjs/common';
import UsersController from '@controller/users.controller';
import UsersService from '@provider/users.service';
import VentChoiceController from '@controller/vent_choice.controller';

@Module({
  controllers: [VentChoiceController],
  providers: [UsersService],
})
export class UsersModule {}
