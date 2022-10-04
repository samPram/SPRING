import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
import { UserModule } from './models/user/user.module';
import { UnitModule } from './models/unit/unit.module';
import { DeviceModule } from './models/device/device.module';
import { MonitoringModule } from './models/monitoring/monitoring.module';

@Module({
  imports: [AuthModule, AppConfigModule, PostgresProviderModule, UserModule, UnitModule, DeviceModule, MonitoringModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
