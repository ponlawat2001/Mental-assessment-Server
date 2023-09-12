import { Body, Controller, Post } from '@nestjs/common';
import { Login } from 'src/interface/auth.interface';
import AuthService from 'src/provider/auth.service';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/Anonymous/login/sdfdsf')
  async Anonymous_login(): Promise<any> {
    return this.authService.Anonymous_login();
  }

  @Post('/email/login')
  async Email_login(@Body() body: Login): Promise<any> {
    return this.authService.Email_login(body);
  }
}

export default AuthController;
