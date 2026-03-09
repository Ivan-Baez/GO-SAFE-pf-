import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  findAll() {
    return this.imagesRepository.find();
  }

  create(createImageDto: CreateImageDto) {
    const image = this.imagesRepository.create(createImageDto);
    return this.imagesRepository.save(image);
  }
}
