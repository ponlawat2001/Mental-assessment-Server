import { Module } from '@nestjs/common';
import AuthController from 'src/controller/auth.controller';
import AuthService from 'src/provider/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
