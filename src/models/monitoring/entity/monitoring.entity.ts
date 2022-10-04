import { DeviceEntity } from '../../device/entity/device.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  WARNING = 'warning',
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Entity('monitoring')
export class MonitoringEntity {
  @PrimaryGeneratedColumn('increment')
  id_monitoring: number;

  @Column('integer', { nullable: false, default: 0 })
  value: number;

  @Column('timestamp')
  datetime: Date;

  @Column({ type: 'enum', enum: Status, default: Status.SUCCESS })
  status: Status;

  //   Relations
  @ManyToOne(() => DeviceEntity, (device) => device.monitors, { cascade: true })
  @JoinColumn({ name: 'device_id' })
  device: DeviceEntity;
}
