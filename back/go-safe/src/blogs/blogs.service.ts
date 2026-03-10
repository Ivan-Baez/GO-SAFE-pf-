<<<<<<< HEAD
// src/blogs/blogs.service.ts
=======
>>>>>>> Dev
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
<<<<<<< HEAD
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
=======
import { CreateBlogDto } from './dto/CreateBlogDto';
import { UpdateBlogDto } from './dto/UpdateBlogDto.';
>>>>>>> Dev

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
<<<<<<< HEAD
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
=======
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
>>>>>>> Dev
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
<<<<<<< HEAD
    await this.blogRepository.delete(id);
=======
    await this.blogRepo.delete(id);
>>>>>>> Dev
  }
}