import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  tag: string;

  @IsString()
  url: string;
}
