<<<<<<< HEAD
// src/qaa/entities/qaa.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
>>>>>>> Dev
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';

@Entity('qaa')
<<<<<<< HEAD
export class Qaa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.qaa, { eager: true })
  user: User;

  @ManyToOne(() => Experience, exp => exp.qaa, { eager: true })
=======
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
>>>>>>> Dev
  experience: Experience;
}