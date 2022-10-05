import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringEntity } from './entity/monitoring.entity';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringEntity])],
  controllers: [MonitoringController],
  providers: [MonitoringService],
})
export class MonitoringModule {}
