import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './entities/review.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews, Experience, Instructor])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
