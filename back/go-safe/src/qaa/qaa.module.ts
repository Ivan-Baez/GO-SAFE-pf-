import { Module } from '@nestjs/common';
import { QaaService } from './qaa.service';
import { QaaController } from './qaa.controller';

@Module({
  controllers: [QaaController],
  providers: [QaaService],
})
export class QaaModule {}
