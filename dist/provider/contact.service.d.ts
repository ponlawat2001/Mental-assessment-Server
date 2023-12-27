import { Contact } from '@interface/contact.interface';
declare class ContactService {
    private readonly contact;
    private contactresult;
    findAll(): Promise<any>;
    update(body: Contact, id: string): Promise<any>;
}
export default ContactService;
