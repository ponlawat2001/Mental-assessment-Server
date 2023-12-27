import { Contact } from '@interface/contact.interface';
import ContactService from '@provider/contact.service';
declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    findAll(): Promise<any>;
    update(body: Contact, id: string): Promise<any>;
}
export default ContactController;
