import { Login } from '@interface/auth.interface';
import AuthService from '@provider/auth.service';
declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Anonymous_login(): Promise<any>;
    Email_login(body: Login): Promise<any>;
}
export default AuthController;
