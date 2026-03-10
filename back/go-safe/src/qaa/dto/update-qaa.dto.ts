import { PartialType } from '@nestjs/mapped-types';
import { CreateQaaDto } from './create-qaa.dto';

export class UpdateQaaDto extends PartialType(CreateQaaDto) {}
