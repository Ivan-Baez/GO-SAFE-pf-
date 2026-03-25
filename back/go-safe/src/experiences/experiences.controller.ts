import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBody } from '@nestjs/swagger';
import { BuyExperienceDto } from './dto/buy-experience.dto';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({
    type: CreateExperienceDto,
    description: 'Create a new user',
    examples: {
      example1: {
        summary: 'User example',
        value: {
          date: '2026-06-15',
          country: 'Colombia',
          city: 'Choachi',
          title: 'Rock Climbing Adventure choachi',
          location: 'Suesca Climbing Park',
          description:
            'Guided rock climbing experience in the famous Suesca cliffs. Includes equipment, safety briefing, and professional instruction for beginners and intermediate climbers.',
          price: 150000,
          capacity: 10,
          ageRange: '18-50',
          dificulty: 'Medium',
          category: 'Climbing',
          duration: '4 hours',
          instructorId: 'd68d5c80-819b-41df-b101-5dd165e3e954',
        },
      },
    },
  })
  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    return this.experiencesService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({
    type: BuyExperienceDto,
    description: 'Create a new user',
    examples: {
      example1: {
        summary: 'User example',
        value: {
          userId: '',
          experienceId: '',
        },
      },
    },
  })
  @Post('buy')
  buyExperience(@Body() dto: BuyExperienceDto) {
    return this.experiencesService.buyExperience(dto);
  }

  @ApiBearerAuth()
  @Roles(Role.Instructor)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('instructorExperiences/:id')
  getInstructorExperiences(@Param('id') id: string) {
    return this.experiencesService.getExperiencesByInstructor(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('userExperiences/:id')
  getUserExperiences(@Param('id') id: string) {
    return this.experiencesService.getExperiencesByUser(id);
  }
}
