import { Login } from '@interface/auth.interface';
declare class AuthService {
    private result;
    Email_login(body: Login): Promise<any>;
    Anonymous_login(): Promise<any>;
}
export default AuthService;
