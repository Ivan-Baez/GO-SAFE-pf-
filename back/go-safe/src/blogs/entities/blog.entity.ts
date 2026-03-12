import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('blogs')
export class Blog {
  @ApiProperty({ example: 'uuid-v4', description: 'ID único del blog' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Texto del blog', description: 'Contenido principal' })
  @Column({ type: 'text', nullable: false, default: '' })
  text: string;

  @ApiProperty({
    example: 'https://miimagen.com/img.png',
    description: 'Imagen asociada',
    required: false,
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.blogs, { eager: true })
  user: User;
}