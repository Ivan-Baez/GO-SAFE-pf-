import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateInstructorDto } from './create-instructor.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateUserInstructorDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: CreateUserDto;

  @ValidateNested()
  @Type(() => CreateInstructorDto)
  instructor!: CreateInstructorDto;
}
