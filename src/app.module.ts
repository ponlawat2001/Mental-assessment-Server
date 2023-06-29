import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CatsController from './controller/cats.controller';
import CatsService from './provider/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
