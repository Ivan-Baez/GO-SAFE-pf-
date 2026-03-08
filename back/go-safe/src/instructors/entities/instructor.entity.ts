import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //   @OneToOne(() => User, (user) => user.instructorProfile)
  //   @JoinColumn()
  //   user!: User;

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
}
