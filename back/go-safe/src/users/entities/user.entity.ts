import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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
  rol!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  profilePic!: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin!: boolean;

  @Column({ type: 'boolean', default: true })
  status!: boolean;

  // @DeleteDateColumn()
  // @OneToMany(() => Order, (order) => order.user)
  // orders_id!: Order[];
}
