import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Usercreate, Users } from '@interface/users.interface';
import UsersService from '@provider/users.service';
import VentChoiceService from '@provider/vent_choice.service';
import { VentChoice } from '@interface/vent_choice.interface';

@Controller('ventchoice')
class VentChoiceController {
  constructor(private readonly ventChoiceService: VentChoiceService) {}

  @Get('findOne/:id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.ventChoiceService.findOne(id);
  }

  @Get('findAll')
  findAll(): Promise<any> {
    return this.ventChoiceService.findAll();
  }

  @Get('findCount')
  findCount(): Promise<any> {
    return this.ventChoiceService.findCount();
  }

  @Post('create')
  create(@Body() body: VentChoice): Promise<any> {
    return this.ventChoiceService.create(body.choice);
  }

  @Put('update/:id')
  update(@Param('id') id: string): Promise<any> {
    return this.ventChoiceService.update(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.ventChoiceService.delete(id);
  }
}

export default VentChoiceController;
