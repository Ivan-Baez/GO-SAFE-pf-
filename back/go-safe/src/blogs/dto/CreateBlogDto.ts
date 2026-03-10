import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsUUID()
  userId: string;
}