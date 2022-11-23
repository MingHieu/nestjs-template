import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto';
import { Public } from './decorator/public.decorator';

@Public()
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
}
