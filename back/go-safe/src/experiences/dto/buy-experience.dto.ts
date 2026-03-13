import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BuyExperienceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  userId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  experienceId!: string;
}
