// src/qaa/qaa.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QaaService } from './qaa.service';
import { CreateQaaDto } from './dto/create-qaa.dto';
import { UpdateQaaDto } from './dto/update-qaa.dto';

@Controller('qaa')
export class QaaController {
  constructor(private readonly qaaService: QaaService) {}

  @Post()
  create(@Body() createQaaDto: CreateQaaDto) {
    return this.qaaService.create(createQaaDto);
  }

  @Get()
  findAll() {
    return this.qaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qaaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQaaDto: UpdateQaaDto) {
    return this.qaaService.update(id, updateQaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qaaService.remove(id);
  }
}
