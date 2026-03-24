import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'boolean', default: false })
  status!: boolean;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  paymentStatus!: string;

  @Column({ type: 'varchar', nullable: true })
  preferenceId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  paymentId!: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  amount!: number | null;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @ManyToOne(() => Experience, (experience) => experience.orders)
  experience!: Experience;
}
