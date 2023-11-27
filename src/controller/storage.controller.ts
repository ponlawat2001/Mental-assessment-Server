import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import StorageService from '@provider/storage.service';
import { Storage } from '@interface/storage.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.storageService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('audio'))
  async create(@UploadedFile() audio: Express.Multer.File): Promise<any> {
    return this.storageService.upload(audio);
  }
}
export default StorageController;
