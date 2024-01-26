import { Adminusers } from '@interface/adminusers.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import AdminusersService from '@provider/adminusers.service';

@Controller('admin')
class AdminusersController {
  constructor(private readonly adminusersService: AdminusersService) {}

  @Get('findAll')
  async findAdmin(): Promise<any> {
    return this.adminusersService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.adminusersService.findOne(id);
  }

  @Get('findEmail/:email')
  async findEmail(@Param('email') email: string): Promise<any> {
    return this.adminusersService.findEmail(email);
  }

  @Post('create')
  async create(@Body() body: Adminusers): Promise<any> {
    return this.adminusersService.create(body);
  }

  @Put('update/:id')
  async update(
    @Body() body: Adminusers,
    @Param('id') id: string,
  ): Promise<any> {
    return this.adminusersService.update(body, id);
  }

  @Put('delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.adminusersService.delete(id);
  }
}
export default AdminusersController;
