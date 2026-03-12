import { Experience } from 'src/experiences/entities/experience.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.instructorProfile)
  @JoinColumn()
  user!: User;

  @Column({
    type: 'text',
    nullable: false,
  })
  about!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  certifications!: string;

  @OneToMany(() => Experience, (experience) => experience.instructor)
  experiences!: Experience[];
}