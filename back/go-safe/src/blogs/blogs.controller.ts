import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Blog creado', type: Blog })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de blogs', type: [Blog] })
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Blog encontrado', type: Blog })
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Blog actualizado', type: Blog })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Blog eliminado' })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}