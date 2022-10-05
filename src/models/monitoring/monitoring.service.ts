import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringEntity, Status } from './entity/monitoring.entity';
import { RandomPayload } from './interfaces/random.interface';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(MonitoringEntity)
    private monitoringRepository: Repository<MonitoringEntity>,
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
}
