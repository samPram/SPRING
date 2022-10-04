import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id_user: number;

  @Column('varchar', { length: 50 })
  fullname: string;

  @Index()
  @Column('varchar', { length: 12, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 144, nullable: false })
  password: string;

  @Column('varchar', { length: 144 })
  image: string;

  @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;
}
