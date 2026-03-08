import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'experiences',
})
export class Experience {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  date!: string;

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
  title!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  location!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  capacity!: number;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  ageRange!: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  dificulty!: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  category!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  duration!: string;
}
