import { MonitoringEntity } from '../../monitoring/entity/monitoring.entity';
import { UnitEntity } from '../../unit/entity/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

@Entity('device')
export class DeviceEntity {
  @PrimaryColumn()
  id_device: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 144 })
  description: string;

  @Column('varchar', { length: 12 })
  unit_size: string;

  @Column('integer')
  max: number;

  @Column('integer')
  min: number;

  //   Relations
  @ManyToOne(() => UnitEntity, (unit) => unit.devices, { cascade: true })
  @JoinColumn({ name: 'unit_id' })
  unit: UnitEntity;

  @OneToMany(() => MonitoringEntity, (monitor) => monitor.device)
  monitors: MonitoringEntity[];
}
