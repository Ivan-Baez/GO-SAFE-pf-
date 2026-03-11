import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/CreateBlogDto';
import { UpdateBlogDto } from './dto/UpdateBlogDto.';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepo.create(createBlogDto);
    return this.blogRepo.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Blog | null> {
    return this.blogRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog | null> {
    await this.blogRepo.update(id, updateBlogDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.blogRepo.delete(id);
  }
}