import { Module } from '@nestjs/common';
import TaskController from '@controller/task.controller';
import TaskService from '@provider/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
