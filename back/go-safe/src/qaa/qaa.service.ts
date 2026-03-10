<<<<<<< HEAD
// src/qaa/qaa.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qaa } from './entities/qaa.entity';
import { CreateQaaDto } from './dto/create-qaa.dto';
import { UpdateQaaDto } from './dto/update-qaa.dto';

@Injectable()
export class QaaService {
  constructor(
    @InjectRepository(Qaa)
    private readonly qaaRepository: Repository<Qaa>,
  ) {}

  async create(createQaaDto: CreateQaaDto): Promise<Qaa> {
    const qaa = this.qaaRepository.create(createQaaDto);
    return this.qaaRepository.save(qaa);
  }

  async findAll(): Promise<Qaa[]> {
    return this.qaaRepository.find();
  }

  async findOne(id: string): Promise<Qaa | null> {
    return this.qaaRepository.findOne({ where: { id } });
  }

  async update(id: string, updateQaaDto: UpdateQaaDto): Promise<Qaa | null> {
    await this.qaaRepository.update(id, updateQaaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.qaaRepository.delete(id);
=======
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
>>>>>>> Dev
  }
}
