import { Vent } from '@interface/vent.interface';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import VentService from '@provider/vent.service';

@Controller('vent')
class VentController {
  constructor(private ventService: VentService) {}

  @Get('findAll')
  findAll(): Promise<any> {
    return this.ventService.findAll();
  }

  @Get('findCount')
  findCount(): Promise<any> {
    return this.ventService.findCount();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.ventService.findOne(id);
  }

  @Post('create')
  async create(@Body() body: Vent): Promise<any> {
    return this.ventService.create(body);
  }
}

export default VentController;
