import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title!: string;

  @IsString()
  text!: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
