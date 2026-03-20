import { Certifications } from 'src/certifications/entities/certification.entity';
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

  @Column({ type: 'varchar', length: 50, nullable: false })
  career!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  institution!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  level!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  period!: string;

  @Column({ type: 'boolean', default: false })
  onCourse!: string;

  @Column({ type: 'text', nullable: false })
  about!: string;

  @OneToMany(() => Experience, (experience) => experience.instructor)
  experiences!: Experience[];

  @OneToOne(() => User, (user) => user.instructor)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Certifications, (cert) => cert.instructor, {
    cascade: true,
  })
  certifications!: Certifications[];
}
