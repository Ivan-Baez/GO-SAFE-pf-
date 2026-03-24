import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Experience, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
