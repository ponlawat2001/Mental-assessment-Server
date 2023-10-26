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

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findOne/:id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(id);
  }

  @Get('findOneAvatar/:email')
  findOneAvatar(@Param('email') email: string): Promise<any> {
    return this.usersService.findOneAvatar(email);
  }

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

  @Put('update/:id')
  update(@Body() body: Users, @Param('id') id: string): Promise<any> {
    return this.usersService.update(body, id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.usersService.delete(id);
  }
}

export default UsersController;
