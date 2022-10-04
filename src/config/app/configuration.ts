import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT) | 4000,
  secret: process.env.SECRET_TOKEN,
  expired: process.env.EXPIRED_TOKEN,
}));
