import { Controller, Get, Param } from '@nestjs/common';
import VentService from 'src/provider/vent.service';

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
}

export default VentController;
