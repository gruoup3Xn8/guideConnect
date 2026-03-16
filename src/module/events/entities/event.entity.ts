import { Auth } from 'src/module/auth/entities/auth.entity';
import { BaseEntity as Base } from 'src/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Events' })
export class Event extends Base {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  maxParticipants: number;

  // RELATION
  @ManyToOne(() => Auth, (auth) => auth.event)
  @JoinColumn({ name: 'auth_id' })
  auth: Auth;
}