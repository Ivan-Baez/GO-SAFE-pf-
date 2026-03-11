// src/blogs/blogs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(createBlogDto);
    return this.blogRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async findOne(id: string): Promise<Blog | null> {
    return this.blogRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog | null> {
    await this.blogRepository.update(id, updateBlogDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.blogRepository.delete(id);
  }
}