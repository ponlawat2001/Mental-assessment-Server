import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'firebase/auth';
import { Usercreate } from 'src/interface/users.interface';
import UsersService from 'src/provider/users.service';

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAll')
  findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @Get('findCount')
  findCount(): Promise<any> {
    return this.usersService.findCount();
  }

  @Post('create')
  create(@Body() body: Usercreate): Promise<any> {
    return this.usersService.create(body.email, body.password);
  }
}

export default UsersController;
