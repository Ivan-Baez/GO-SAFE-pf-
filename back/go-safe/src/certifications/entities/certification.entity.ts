import { Instructor } from 'src/instructors/entities/instructor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('certifications')
export class Certifications {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: false })
  url!: string;

  // @ManyToOne(() => Instructor, (instructor) => instructor.certifications)
  // @JoinColumn({ name: 'instructorId' })
  // instructor!: Instructor;
}
