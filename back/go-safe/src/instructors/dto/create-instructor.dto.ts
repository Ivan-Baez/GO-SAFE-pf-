import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { CreateCertificationDto } from 'src/certifications/dto/create-certification.dto';

export class CreateInstructorDto {
  /**
   * Description about the instructor
   * @example Professional climbing instructor with 10 years of experience
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(500)
  about!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCertificationDto)
  certifications!: CreateCertificationDto[];
}
