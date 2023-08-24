import { Controller, Get } from '@nestjs/common';
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
}

export default UsersController;
