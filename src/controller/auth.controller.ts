import { Body, Controller, Post } from '@nestjs/common';
import { Login } from '@interface/auth.interface';
import AuthService from '@provider/auth.service';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/email/reset')
  async Email_reset(@Body() body: Login): Promise<any> {
    return this.authService.Reset_password(body);
  }

  @Post('/Anonymous/login')
  async Anonymous_login(): Promise<any> {
    return this.authService.Anonymous_login();
  }

  @Post('/email/login')
  async Email_login(@Body() body: Login): Promise<any> {
    return this.authService.Email_login(body);
  }
}

export default AuthController;
