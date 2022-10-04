import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  // get secret(): string {
  //   return this.configService.get<string>('app.secret');
  // }

  // get expired(): string {
  //   return this.configService.get<string>('app.expired');
  // }
}
