import { DeviceEntity } from '../../device/entity/device.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import * as moment from 'moment';

export enum Status {
  WARNING = 'warning',
  DANGER = 'danger',
}

@Entity('monitoring')
export class MonitoringEntity {
  @PrimaryGeneratedColumn('increment')
  id_monitoring: number;

  @Column('integer', { nullable: false, default: 0 })
  value: number;

  @Transform(({ value }) =>
    moment(value.datetime).format('DD/MM/YYYY hh:mm:ss'),
  )
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @Column({ type: 'enum', enum: Status, nullable: true })
  status: Status;

  //   Relations
  @ManyToOne(() => DeviceEntity, (device) => device.monitors, { cascade: true })
  @JoinColumn({ name: 'device_id' })
  device: DeviceEntity;
}
