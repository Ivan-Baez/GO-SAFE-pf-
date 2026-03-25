import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ExperiencesService } from 'src/experiences/experiences.service';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('instructors')
export class InstructorsController {
  constructor(
    private readonly instructorsService: InstructorsService,
    private readonly experiencesService: ExperiencesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id/reviews')
  findReviewsByInstructor(@Param('id') id: string) {
    return this.reviewsService.findReviewsByInstructor(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id/experiences')
  findAllExpInstructor(@Param('id') id: string) {
    return this.experiencesService.getExperiencesByInstructor(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id/bookings')
  findAllInstructorBookings(@Param('id') id: string) {
    return this.experiencesService.findAllInstructorBookings(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Instructor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Instructor)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorsService.update(id, updateInstructorDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Instructor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorsService.remove(id);
  }
}
