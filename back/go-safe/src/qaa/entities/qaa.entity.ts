// src/qaa/entities/qaa.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';

@Entity('qaa')
export class Qaa {
  @ApiProperty({ example: 'uuid-v4', description: 'ID único de la pregunta/respuesta' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '¿Cuál es la política de cancelación?', description: 'Texto de la pregunta' })
  @Column({ type: 'text', nullable: false, default: '' })
  question: string;

  @ApiProperty({ example: 'Podés cancelar hasta 24 horas antes.', description: 'Texto de la respuesta' })
  @Column({ type: 'text', nullable: true })
  answer: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.qaas, { eager: true })
  user: User;

  @ApiHideProperty()
  @ManyToOne(() => Experience, (experience) => experience.qaas, { eager: true })
  experience: Experience;
}