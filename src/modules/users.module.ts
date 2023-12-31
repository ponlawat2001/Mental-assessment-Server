import { Module } from '@nestjs/common';
import UsersController from '@controller/users.controller';
import UsersService from '@provider/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
