import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';

@Module({
  imports: [AuthModule, AppConfigModule, PostgresProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
