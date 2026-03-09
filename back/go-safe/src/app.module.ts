import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GuidesModule } from './guides/guides.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { QaaModule } from './qaa/qaa.module';
@Module({
  imports: [UsersModule, GuidesModule, ExperiencesModule, OrdersModule, AuthModule, BlogsModule, QaaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}