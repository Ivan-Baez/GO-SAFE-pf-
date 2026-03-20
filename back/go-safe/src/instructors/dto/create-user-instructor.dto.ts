import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateInstructorDto } from './create-instructor.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCertificationDto } from '../../certifications/dto/create-certification.dto';

export class CreateUserInstructorDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: CreateUserDto;

  @ValidateNested()
  @Type(() => CreateInstructorDto)
  instructor!: CreateInstructorDto;

  @ValidateNested()
  @Type(() => CreateCertificationDto)
  certifications!: CreateCertificationDto;
}
export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}
