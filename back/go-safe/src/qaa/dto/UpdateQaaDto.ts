import { PartialType } from '@nestjs/mapped-types';
import { CreateQaaDto } from './CreateQaaDto';

export class UpdateQaaDto extends PartialType(CreateQaaDto) {}
