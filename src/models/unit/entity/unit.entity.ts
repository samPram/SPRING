import { DeviceEntity } from '../../device/entity/device.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unit')
export class UnitEntity {
  @PrimaryGeneratedColumn('increment')
  id_unit: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 144 })
  description: string;

  //   Relations
  @OneToMany(() => DeviceEntity, (device) => device.unit)
  devices: DeviceEntity[];
}
