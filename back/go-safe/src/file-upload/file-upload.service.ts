import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,

    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const uploadResponse = await this.fileUploadRepository.uploadImage(file);

    const image = this.imagesRepository.create({
      url: uploadResponse.secure_url,
      tag: 'experience',
    });

    return this.imagesRepository.save(image);
  }
}
