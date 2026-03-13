import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { Order } from 'src/orders/entities/order.entity';
// import { Blog } from 'src/blogs/entities/blog.entity';

@Entity({
  name: 'users',
})
export class User {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  fistName!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  userName!: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  documentType!: string;

  @Column({
    type: 'bigint',
    nullable: false,
    unique: true,
  })
  document!: number;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  genre!: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  age!: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  address!: string;

  @Column({
    type: 'bigint',
    nullable: false,
    unique: true,
  })
  phone!: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  country!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  city!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  role!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  profilePic!: string;

  @Column({ type: 'boolean', default: true })
  status!: boolean;

  @OneToOne(() => Instructor, (instructor) => instructor.user)
  instructorProfile!: Instructor;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  // @OneToMany(() => Blog, (blog) => blog.user)
  // blogs: Blog[];
}
>>>>>>> 1854dc192495a803152b7b658ecd58c086396301
