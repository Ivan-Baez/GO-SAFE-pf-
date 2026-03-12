import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @Column({
    type: 'text',
    default: 'No image',
  })
  url: string;

  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
  user!: User;
}