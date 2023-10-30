import AvatarController from '@controller/avatar.controller';
import AvatarService from '@provider/avatar.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModult {}
