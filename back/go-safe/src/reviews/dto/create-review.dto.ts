import { IsInt, Min, Max, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rate!: number;

  @IsString()
  commentary!: string;

  @IsUUID()
  experienceId!: string;
}
