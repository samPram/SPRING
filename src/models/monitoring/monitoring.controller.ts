import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RegistrationGateway } from 'src/providers/websocket/registration.gateway';
import { Role } from '../user/entity/user.entity';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(
    private readonly monitoringService: MonitoringService,
    @Inject(forwardRef(() => RegistrationGateway))
    private registrationGtw: RegistrationGateway,
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getDataMonitoring(@Query() query: any) {
    const data = await this.monitoringService.getAll(query);

    this.registrationGtw.emitData(data);

    return data;
  }
}
