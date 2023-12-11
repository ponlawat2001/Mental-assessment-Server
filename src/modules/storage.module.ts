import { Module } from '@nestjs/common';
import StorageController from '@controller/storage.controller';
import StorageService from '@provider/storage.service';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
