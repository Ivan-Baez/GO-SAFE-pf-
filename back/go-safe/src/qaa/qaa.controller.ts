import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QaaService } from './qaa.service';
import { CreateQaaDto } from './dto/create-qaa.dto';
import { UpdateQaaDto } from './dto/update-qaa.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Qaa } from './entities/qaa.entity';

@ApiTags('qaa')
@Controller('qaa')
export class QaaController {
  constructor(private readonly qaaService: QaaService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Pregunta creada', type: Qaa })
  create(@Body() createQaaDto: CreateQaaDto) {
    return this.qaaService.create(createQaaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de preguntas/respuestas', type: [Qaa] })
  findAll() {
    return this.qaaService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Pregunta encontrada', type: Qaa })
  findOne(@Param('id') id: string) {
    return this.qaaService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Pregunta actualizada', type: Qaa })
  update(@Param('id') id: string, @Body() updateQaaDto: UpdateQaaDto) {
    return this.qaaService.update(id, updateQaaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Pregunta eliminada' })
  remove(@Param('id') id: string) {
    return this.qaaService.remove(id);
  }
}