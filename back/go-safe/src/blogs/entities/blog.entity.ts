<<<<<<< HEAD
// src/blogs/entities/blog.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('blogs') // 👈 nombre explícito de la tabla
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('blogs')
>>>>>>> Dev
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

<<<<<<< HEAD
  @Column()
=======
  @Column('text')
>>>>>>> Dev
  text: string;

  @Column({ nullable: true })
  imageUrl: string;

<<<<<<< HEAD
  @ManyToOne(() => User, user => user.blogs, { eager: true })
=======
  @ManyToOne(() => User, (user) => user.blogs)
>>>>>>> Dev
  user: User;
}