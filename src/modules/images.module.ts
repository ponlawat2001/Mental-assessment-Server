import { Module } from '@nestjs/common';
import ImagesController from '@controller/images.controller';
import ImagesService from '@provider/images.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
