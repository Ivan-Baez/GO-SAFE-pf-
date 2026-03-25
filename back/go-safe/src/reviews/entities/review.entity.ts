import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Min, Max, IsInt } from 'class-validator';

@Entity({ name: 'reviews' })
@Unique(['user', 'experience'])
export class Reviews {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @Column({ type: 'int' })
  rate!: number;

  @Column({ type: 'text' })
  commentary!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @ManyToOne(() => Experience, (experience) => experience.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experience_id' })
  experience!: Experience;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
