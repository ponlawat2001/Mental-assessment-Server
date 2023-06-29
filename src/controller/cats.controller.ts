import { Controller, Get } from '@nestjs/common';
import { Cat } from 'src/interface/cats.interface';
import CatsService from 'src/provider/cats.service';

@Controller('cats')
class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('find')
  async find(): Promise<Cat[]> {
    return this.catsService.find();
  }

  @Get('findAll')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}

export default CatsController;
