import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from '../../users/entities/user.entity';
// import { Experience } from '../../experiences/entities/experience.entity';

@Entity({
  name: 'reviews',
})
export class Reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
  })
  rate: number;

  @Column({
    type: 'text',
  })
  commentary: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
}
// @ManyToOne(() => User, (user) => user.reviews)
//   user: User;

//   @ManyToOne(() => Experience, (experience) => experience.reviews)
//   experience: Experience;
