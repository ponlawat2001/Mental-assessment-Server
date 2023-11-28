import { Audio } from '@interface/audio.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import AudioService from '@provider/audio.service';

@Controller('audio')
class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('findOne/:email')
  async findOne(@Param('email') email: string): Promise<any> {
    return this.audioService.findOne(email);
  }

  @Post('create')
  async create(@Body() body: Audio): Promise<any> {
    return this.audioService.create(body);
  }

  @Put('update/:id')
  async update(@Body() body: Audio, @Param('id') id: string): Promise<any> {
    return this.audioService.update(body, id);
  }
}
export default AudioController;
