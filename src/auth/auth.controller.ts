import {
  Controller,
  Headers,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async postLogut(@Request() req, @Headers('Authorization') auth) {
    const [bearer, token] = auth.split(' ');
    // return req.user;

    return await this.authService.logout(req.user?.id_user, token);
  }
}
