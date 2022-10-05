import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { DeviceEntity } from './entity/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepository: Repository<DeviceEntity>,
  ) {}

  async getStatisticSensor(condition: any, filter = '') {
    try {
      const { id_unit, id } = condition;

      if (!filter) {
        filter = moment().format('DD-MM-YYYY');
      }

      const data = await this.deviceRepository
        .createQueryBuilder('device')
        .addSelect([
          'unit.id_unit',
          'unit.name',
          'monitor.id_monitoring',
          'monitor.value',
          'monitor.datetime',
          'monitor.status',
        ])
        .leftJoin('device.monitors', 'monitor')
        .leftJoin('device.unit', 'unit')
        .where('monitor.device_id = :id_device', { id_device: id })
        .andWhere('CAST(monitor.datetime as DAtE) = :filter', {
          filter: filter,
        })
        .getOne();

      return data
        ? {
            mean:
              data.monitors.reduce((a, b) => a + b.value, 0) /
              data.monitors.length,
            ...data,
          }
        : {};
    } catch (error) {
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
