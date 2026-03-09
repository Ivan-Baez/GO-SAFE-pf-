import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // Relación inversa con Blogs
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => QAA, (qaa) => qaa.user)
qaas: QAA[];
}