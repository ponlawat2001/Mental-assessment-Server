import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import HistoryService from '@provider/history.service';
import { History } from '@interface/history.interface';

@Controller('history')
class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.historyService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.historyService.findOne(id);
  }

  @Post('create')
  async create(@Body() body: History): Promise<any> {
    return this.historyService.create(body);
  }
}
export default HistoryController;
