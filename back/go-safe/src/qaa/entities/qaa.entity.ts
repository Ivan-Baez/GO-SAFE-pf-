import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';

@Entity('qaa')
export class QAA {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.qaas, { eager: true })
  user: User;

  @ManyToOne(() => Experience, (experience) => experience.qaas, { eager: true })
  experience: Experience;
}