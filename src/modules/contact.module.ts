import { Module } from '@nestjs/common';
import ContactController from '@controller/contact.controller';
import ContactService from '@provider/contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
