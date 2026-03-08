import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'orders',
})
export class Order {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 
  })
}
