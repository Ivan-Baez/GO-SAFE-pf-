<<<<<<< HEAD
// src/qaa/qaa.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QaaService } from './qaa.service';
import { CreateQaaDto } from './dto/create-qaa.dto';
import { UpdateQaaDto } from './dto/update-qaa.dto';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QaaService } from './qaa.service';
import { CreateQaaDto } from './dto/CreateQaaDto';
import { UpdateQaaDto } from './dto/UpdateQaaDto';
>>>>>>> Dev

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
<<<<<<< HEAD
    return this.qaaService.findOne(id);
=======
    return this.qaaService.findOne(+id);
>>>>>>> Dev
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQaaDto: UpdateQaaDto) {
<<<<<<< HEAD
    return this.qaaService.update(id, updateQaaDto);
=======
    return this.qaaService.update(+id, updateQaaDto);
>>>>>>> Dev
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.qaaService.remove(id);
=======
    return this.qaaService.remove(+id);
>>>>>>> Dev
  }
}
