import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../user/entity/user.entity';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(':id_unit/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOneDevice(@Param() param: string, @Query('date') search: string) {
    return await this.deviceService.getStatisticSensor(param, search);
  }
}
