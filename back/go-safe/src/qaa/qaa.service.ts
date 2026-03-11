import { Injectable } from '@nestjs/common';
import { CreateQaaDto } from './dto/CreateQaaDto';
import { UpdateQaaDto } from './dto/UpdateQaaDto';

@Injectable()
export class QaaService {
  create(createQaaDto: CreateQaaDto) {
    return 'This action adds a new qaa';
  }

  findAll() {
    return `This action returns all qaa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qaa`;
  }

  update(id: number, updateQaaDto: UpdateQaaDto) {
    return `This action updates a #${id} qaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} qaa`;
  }
}
