import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rate: number;

  @IsString()
  commentary: string;

  @IsString()
  userId: string;

  @IsString()
  experienceId: string;
}
