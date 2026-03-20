import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCertificationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @IsUUID()
  @IsNotEmpty()
  instructorId!: string;
}
