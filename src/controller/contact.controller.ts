import { Contact } from '@interface/contact.interface';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import ContactService from '@provider/contact.service';

@Controller('contact')
class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.contactService.findAll();
  }

  @Put('update/:id')
  async update(@Body() body: Contact, @Param('id') id: string): Promise<any> {
    return this.contactService.update(body, id);
  }
}
export default ContactController;
