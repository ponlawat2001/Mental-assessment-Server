import { Images } from '@interface/images.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import ImagesService from '@provider/images.service';

@Controller('image')
class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('findOwner/:owner')
  async findOne(@Param('owner') owner: string): Promise<any> {
    return this.imagesService.findOwner(owner);
  }

  @Post('create')
  async create(@Body() body: Images): Promise<any> {
    return this.imagesService.create(body);
  }

  @Put('update/:id')
  async update(@Body() body: Images, @Param('id') id: string): Promise<any> {
    return this.imagesService.update(body, id);
  }
}
export default ImagesController;
