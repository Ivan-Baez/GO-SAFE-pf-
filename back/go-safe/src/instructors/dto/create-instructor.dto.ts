import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

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

  /**
   * Certifications or qualifications of the instructor
   * Can be text or URLs to certification files
   * @example IFSC Certified Climbing Instructor
   */
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  certifications?: string;
}
