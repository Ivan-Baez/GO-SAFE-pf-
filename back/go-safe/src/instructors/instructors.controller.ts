import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { CreateUserInstructorDto } from './dto/create-user-instructor.dto';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  create(@Body() createInstructorDto: CreateUserInstructorDto) {
    return this.instructorsService.create(createInstructorDto);
  }

  @Get()
  findAll() {
    return this.instructorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorsService.update(+id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorsService.remove(id);
  }
}
