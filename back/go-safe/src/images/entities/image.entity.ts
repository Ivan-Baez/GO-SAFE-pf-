import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Experience } from '../../experiences/entities/experience.entity';
// import { Blog } from '../../blogs/entities/blog.entity';

@Entity({
  name: 'images',
})
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
}
//   @ManyToOne(() => Experience, (experience) => experience.images, {
//     onDelete: 'CASCADE',
//   })
//   experience: Experience;

//   @ManyToOne(() => Blog, (blog) => blog.images, {
//     nullable: true,
//     onDelete: 'CASCADE',
//   })
//   blog: Blog;
