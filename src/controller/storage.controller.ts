import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import StorageService from '@provider/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('findOneAudio/:id')
  async findOneAudio(@Param('id') id: string): Promise<any> {
    return this.storageService.findOne(id, false);
  }

  @Get('findOneImage/:id')
  async findOneImage(@Param('id') id: string): Promise<any> {
    return this.storageService.findOne(id, true);
  }

  @Post('uploadAudio')
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(
    @UploadedFile() audio: Express.Multer.File,
    image: Express.Multer.File,
  ): Promise<any> {
    return this.storageService.upload(audio, false);
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<any> {
    return this.storageService.upload(image, true);
  }
}
export default StorageController;
