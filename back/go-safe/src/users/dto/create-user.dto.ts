import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'User first name',
    example: 'Juan',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  fistName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Perez',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @ApiProperty({
    description: 'Username',
    example: 'uPerez',
    minLength: 2,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  userName!: string;

  @ApiProperty({
    description: 'Document type',
    example: 'CC',
    maxLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  documentType!: string;

  @ApiProperty({
    description: 'Document number',
    example: 123456789,
    minimum: 1,
    maximum: 999999999999,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(999999999999)
  document!: number;

  @ApiProperty({
    description: 'User gender',
    example: 'Male',
    maxLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  genre!: string;

  @ApiProperty({
    description: 'User age',
    example: '13/05/1994',
    minimum: 5,
    maximum: 40,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  birthdate!: number;

  @ApiProperty({
    description: 'Address',
    example: 'Calle 123 #45-67',
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  address!: string;

  @ApiProperty({
    description: 'Phone number',
    example: 3001234567,
    minimum: 1000,
    maximum: 999999999999,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  @Max(999999999999)
  phone!: number;

  @ApiProperty({
    description: 'Country',
    example: 'Colombia',
    minLength: 3,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  country!: string;

  @ApiProperty({
    description: 'City',
    example: 'Bogota',
    minLength: 3,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city!: string;

  @ApiProperty({
    description: 'Email with structure that includes @ and .(domain)',
    example: 'admin@admin.com',
    maxLength: 50,
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(50)
  email!: string;

  @ApiProperty({
    description:
      'Password. Must contain uppercase, lowercase, number and special character',
    example: '15January!!',
    minLength: 8,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password!: string;

  @ApiProperty({
    description: 'Confirm password',
    example: '15January!!',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;

  @ApiProperty({
    description: 'User role',
    example: 'user',
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  role!: string;

  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsNotEmpty()
  @IsString()
  profilePic!: string;

  @ApiHideProperty()
  status?: boolean;
}
