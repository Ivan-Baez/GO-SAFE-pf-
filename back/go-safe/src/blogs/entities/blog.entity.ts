// src/blogs/entities/blog.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('blogs') // 👈 nombre explícito de la tabla
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, user => user.blogs, { eager: true })
  user: User;
}