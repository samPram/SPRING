import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async postLogin(@Request() req) {
    const { user } = req;

    const token = this.authService.getAccessToken({ sub: user?.id });

    return { data: user, access_token: token };
  }

  @Post('logout')
  async postLogut() {}
}
