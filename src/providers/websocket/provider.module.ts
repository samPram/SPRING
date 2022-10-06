import { Module } from '@nestjs/common';
import { RegistrationGateway } from './registration.gateway';

@Module({
  imports: [],
  providers: [RegistrationGateway],
  exports: [RegistrationGateway],
})
export class WebSocketProviderModule {}
