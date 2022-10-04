import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import * as bcrypt from 'bcrypt';
import { PayloadToken } from './interfaces/token-payload.interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async authLogin(username: string, password: string) {
    try {
      const user = await this.userService.getByUsername(username);

      const passwordIsMatch = await bcrypt.compare(password, user?.password);

      if (!passwordIsMatch) {
        throw new HttpException('Password not match!', HttpStatus.BAD_REQUEST);
      }

      //   remove password
      delete user?.password;

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getAccessToken(payload: PayloadToken) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('app.secret'),
      expiresIn: this.configService.get<string>('app.expired'),
    });

    return token;
  }
}
