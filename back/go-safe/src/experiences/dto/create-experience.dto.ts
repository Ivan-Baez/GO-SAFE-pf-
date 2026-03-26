import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateExperienceDto {
  /**
   * Date of the experience
   * @example 2026-04-10
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  date!: string;

  /**
   * Country where the experience takes place
   * @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  country!: string;

  /**
   * City where the experience takes place
   * @example Bogota
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city!: string;

  /**
   * Title of the experience
   * @example Rock Climbing Adventure
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title!: string;

  /**
   * Specific location
   * @example Suesca Climbing Park
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  location!: string;

  /**
   * Description of the experience
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description!: string;

  /**
   * Price of the experience
   * @example 150000
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(999999999)
  price!: number;

  /**
   * Maximum number of participants
   * @example 10
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  capacity!: number;

  /**
   * Age range allowed
   * @example 18-50
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  ageRange!: string;

  /**
   * picture URL
   * @example https://example.com/avatar.jpg
   */
  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  /**
   * Difficulty level
   * @example Medium
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  dificulty!: string;

  /**
   * Category of the experience
   * @example Climbing
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  category!: string;

  /**
   * Duration of the experience
   * @example 4 hours
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  duration!: string;

  /**
   * Duration of the experience
   * @example 4 hours
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  instructorId!: string;
}
