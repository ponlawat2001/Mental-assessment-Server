import { Avatar } from '@interface/avatar.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import AvatarService from '@provider/avatar.service';

@Controller('avatars')
class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get('findOne/:email')
  async findOne(@Param('email') email: string): Promise<any> {
    return this.avatarService.findOne(email);
  }

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.avatarService.findAll();
  }

  @Get('findCount')
  async findCount(): Promise<any> {
    return this.avatarService.findCount();
  }

  @Post('create')
  async create(@Body() body: Avatar): Promise<any> {
    return this.avatarService.create(body);
  }

  @Put('update/:id')
  async update(@Body() body: Avatar, @Param('id') id: string): Promise<any> {
    return this.avatarService.update(body, id);
  }
}
export default AvatarController;
