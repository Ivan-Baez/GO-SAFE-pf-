// src/blogs/blogs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 📝 Crear blog
  async create(dto: CreateBlogDto, userId: string) {
    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const blog = this.blogRepository.create({
      title: dto.title,
      text: dto.text,
      imageUrl: dto.imageUrl,
      user: { id: userId },
    });

    await this.blogRepository.save(blog);

    return {
      message: 'Blog created successfully',
    };
  }

  async findAll() {
    return this.blogRepository
      .createQueryBuilder('b')
      .leftJoin('b.user', 'u')
      .select([
        'b.id',
        'b.title',
        'b.text',
        'b.imageUrl',
        'b.createdAt',
        'u.userName',
      ])
      .orderBy('b.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string) {
    const blog = await this.blogRepository
      .createQueryBuilder('b')
      .leftJoin('b.user', 'u')
      .where('b.id = :id', { id })
      .select([
        'b.id',
        'b.title',
        'b.text',
        'b.imageUrl',
        'b.createdAt',
        'u.userName',
      ])
      .getOne();

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }
}
