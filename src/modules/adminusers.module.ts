import { Module } from '@nestjs/common';
import AdminusersController from '@controller/adminusers.controller';
import AdminusersService from '@provider/adminusers.service';

@Module({
  controllers: [AdminusersController],
  providers: [AdminusersService],
})
export class AdminusersModule {}
