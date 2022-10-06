import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationGateway } from 'src/providers/websocket/registration.gateway';
import { Repository } from 'typeorm';
import { MonitoringEntity, Status } from './entity/monitoring.entity';
import { RandomPayload } from './interfaces/random.interface';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(MonitoringEntity)
    private monitoringRepository: Repository<MonitoringEntity>,
    @Inject(forwardRef(() => RegistrationGateway))
    private registrationGtw: RegistrationGateway,
  ) {}

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async insertDataLikeSensor() {
    console.log('inserting');

    try {
      const payload: RandomPayload[] = [];

      for (let index = 0; index < 12; index++) {
        const random_value = this.randomIntFromInterval(0, 200);

        let id_device;

        if (index + 1 >= 10) {
          id_device = `SW-${index + 1}`;
        } else {
          id_device = `SW-0${index + 1}`;
        }

        payload.push({
          value: random_value,
          status: this.checkStatus(random_value),
          device: { id_device: id_device },
        });

        console.log(payload[index]);
      }

      await this.monitoringRepository
        .createQueryBuilder()
        .insert()
        .values([...payload])
        .execute();

      this.registrationGtw.emitData(
        await this.getAll({ unit: '', device: '' }),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  checkStatus(value: number): Status {
    if (value >= 80 && value <= 100) {
      return Status.WARNING;
    }
    if (value > 100) {
      return Status.DANGER;
    }
  }

  async getAll(query: any) {
    try {
      const { unit = '', device = '' } = query;

      const sql_query = this.monitoringRepository
        .createQueryBuilder('monitor')
        .leftJoinAndSelect('monitor.device', 'device')
        .leftJoinAndSelect('device.unit', 'unit')
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select('MAX(monitor.id_monitoring)')
            .from(MonitoringEntity, 'monitor')
            .groupBy('monitor.device_id')
            .getQuery();
          return 'monitor.id_monitoring IN ' + subQuery;
        });

      if (unit) {
        sql_query.andWhere('unit.id_unit = :unit', { unit: Number(unit) });
      }

      if (device) {
        sql_query.andWhere('device.id_device = :device', { device: device });
      }

      const data = await sql_query
        .orderBy('monitor.id_monitoring', 'DESC')
        .getMany();

      return data;
    } catch (error) {
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
