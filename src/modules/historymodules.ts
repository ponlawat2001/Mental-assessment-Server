import { Module } from '@nestjs/common';
import HistoryController from '@controller/history.controller';
import HistoryService from '@provider/history.service';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
