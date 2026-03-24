import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { User } from 'src/users/entities/user.entity';
import { Certifications } from 'src/certifications/entities/certification.entity';
import { ExperiencesModule } from 'src/experiences/experiences.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instructor, User, Certifications]),
    ExperiencesModule,
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
  exports: [InstructorsService],
})
export class InstructorsModule {}
