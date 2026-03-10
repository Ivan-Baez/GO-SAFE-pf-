import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { Reviews } from 'src/reviews/entities/review.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Qaa } from 'src/qaa/entities/qaa.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'experiences' })
export class Experience {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 40, nullable: false })
  date!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  country!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  city!: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  title!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  location!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'bigint', nullable: false })
  price!: number;

  @Column({ type: 'int', nullable: false })
  capacity!: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  ageRange!: string;

  @Column({ type: 'varchar', length: 12, nullable: false })
  dificulty!: string;

  @Column({ type: 'varchar', length: 12, nullable: false })
  category!: string;

  @Column({ type: 'varchar', nullable: false })
  duration!: string;

  @ManyToOne(() => Instructor, (instructor) => instructor.experiences)
  instructor!: Instructor;

  @ManyToOne(() => User, (user) => user.experiences, { eager: true })
  user!: User;

  @OneToMany(() => Reviews, (review) => review.experience)
  reviews!: Reviews[];

  @OneToMany(() => Order, (order) => order.experience)
  orders!: Order[];

  @OneToMany(() => Qaa, (qaa) => qaa.experience)
  qaa!: Qaa[];
}