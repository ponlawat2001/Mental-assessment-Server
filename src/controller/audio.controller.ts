import { Audio } from '@interface/audio.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import AudioService from '@provider/audio.service';

@Controller('audio')
class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.audioService.findAll();
  }

  @Get('findOwner/:owner')
  async findOne(@Param('owner') owner: string): Promise<any> {
    return this.audioService.findOwner(owner);
  }

  @Post('create')
  async create(@Body() body: Audio): Promise<any> {
    return this.audioService.create(body);
  }

  @Put('update/:id')
  async update(@Body() body: Audio, @Param('id') id: string): Promise<any> {
    return this.audioService.update(body, id);
  }

  @Put('delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.audioService.delete(id);
  }
}
export default AudioController;
