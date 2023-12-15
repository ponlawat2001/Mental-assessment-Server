import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { History } from '@interface/history.interface';
import TaskService from '@provider/task.service';

@Controller('task')
class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.taskService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.taskService.findOne(id);
  }

  @Get('findOwner/:owner')
  async findOwner(@Param('owner') owner: string): Promise<any> {
    return this.taskService.findOwner(owner);
  }

  @Post('create')
  async create(@Body() body: History): Promise<any> {
    return this.taskService.create(body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.taskService.delete(id);
  }
}
export default TaskController;
