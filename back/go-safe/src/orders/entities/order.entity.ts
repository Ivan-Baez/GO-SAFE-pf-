import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: true })
  status!: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @ManyToOne(() => Experience, (experience) => experience.orders)
  experience!: Experience;
}
