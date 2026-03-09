import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * User first name
   * @example Juan
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  fistName!: string;

  /**
   * User last name
   * @example Perez
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  /**
   * User last name
   * @example uPerez
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  userName!: string;

  /**
   * Document type
   * @example CC
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  documentType!: string;

  /**
   * Document number
   * @example 123456789
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(999999999999)
  document!: number;

  /**
   * User gender
   * @example Male
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  genre!: string;

  /**
   * User age
   * @example 25
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(120)
  age!: number;

  /**
   * Address
   * @example Calle 123 #45-67
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  address!: string;

  /**
   * Phone number
   * @example 3001234567
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  @Max(999999999999)
  phone!: number;

  /**
   * Country
   * @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  country!: string;

  /**
   * City
   * @example Bogota
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city!: string;

  /**
   * Email
   * @example user@email.com
   */
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(50)
  email!: string;

  /**
   * Password
   * Must contain uppercase, lowercase, number and special character
   * @example 15January!!
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password!: string;

  /**
   * Confirm password
   */
  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;

  /**
   * User role
   * @example user
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  rol!: string;

  /**
   * Profile picture
   * @example https://example.com/avatar.jpg
   */
  @IsNotEmpty()
  @IsString()
  profilePic!: string;

  @ApiHideProperty()
  isAdmin?: boolean;

  @ApiHideProperty()
  status?: boolean;
}
