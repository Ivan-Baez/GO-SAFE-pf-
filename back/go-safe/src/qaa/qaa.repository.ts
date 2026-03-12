// src/qaa/qaa.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Qaa } from './entities/qaa.entity';

@Injectable()
export class QaaRepository extends Repository<Qaa> {
  constructor(private dataSource: DataSource) {
    // inicializamos el repositorio extendiendo el de Qaa
    super(Qaa, dataSource.createEntityManager());
  }

  async findByQuestion(question: string): Promise<Qaa[]> {
    console.log('Buscando QAA con pregunta:', question);
    return this.find({ where: { question } });
  }

  async findByAnswer(answer: string): Promise<Qaa[]> {
    console.log('Buscando QAA con respuesta:', answer);
    return this.find({ where: { answer } });
  }
}