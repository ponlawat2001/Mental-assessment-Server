import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(): string[] {
    return this.appService.getUsers();
  }
}
