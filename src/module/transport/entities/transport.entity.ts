import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { BaseEntity } from 'src/database/base.entity';
import { Location } from 'src/module/loacation/entities/loacation.entity';

export enum TransportType {
  BUS = 'bus',
  CAR = 'car',
  TRAIN = 'train',
  TAXI = 'taxi',
}

@Entity({ name: 'transports' })
export class Transport extends BaseEntity {
  @Column()
  provider_name: string; 

  @Column({
    type: 'enum',
    enum: TransportType,
    default: TransportType.CAR,
  })
  type: TransportType;

  @Column()
  price: number;

  @Column({ nullable: true })
  capacity: number; 

  @Column({ default: true })
  is_available: boolean;

  @ManyToOne(() => Auth, (auth) => auth.transport)
  @JoinColumn({ name: 'auth_id' })
  auth: Auth;

   @ManyToOne(() =>Location, (location) => location.transport )
    @JoinColumn({name: "location_id"})
    location: Location
  
}