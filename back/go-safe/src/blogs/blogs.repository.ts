// src/blogs/blogs.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsRepository extends Repository<Blog> {
  constructor(private dataSource: DataSource) {
    // inicializamos el repositorio extendiendo el de Blog
    super(Blog, dataSource.createEntityManager());
  }

  async findByText(text: string): Promise<Blog[]> {
    console.log('Buscando blogs con texto:', text);
    return this.find({ where: { text } });
  }
}
