import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QaaService } from './qaa.service';
import { QaaController } from './qaa.controller';
import { Qaa } from './entities/qaa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qaa])],
  controllers: [QaaController],
  providers: [QaaService],
})
export class QaaModule {}