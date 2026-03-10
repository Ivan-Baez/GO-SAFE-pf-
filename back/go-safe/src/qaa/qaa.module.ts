import { Module } from '@nestjs/common';
<<<<<<< HEAD
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
=======
import { QaaService } from './qaa.service';
import { QaaController } from './qaa.controller';

@Module({
  controllers: [QaaController],
  providers: [QaaService],
})
export class QaaModule {}
>>>>>>> Dev
