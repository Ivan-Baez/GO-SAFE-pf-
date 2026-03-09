import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    try {
      const newExperience: Experience =
        this.experiencesRepository.create(createExperienceDto);
      await this.experiencesRepository.save(newExperience);
      return newExperience;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const experiencesFound = await this.experiencesRepository.find();
    return experiencesFound;
  }

  async findOne(id: string) {
    try {
      const experiencesFound = await this.experiencesRepository.findOneBy({
        id,
      });

      if (!experiencesFound)
        throw new NotFoundException('Experience not found');

      return experiencesFound;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const experienceFound = await this.experiencesRepository.findOneBy({
      id,
    });
    if (!experienceFound) throw new NotFoundException('Experience not found');

    try {
      const newExperience = updateExperienceDto;
      await this.experiencesRepository.update(id, newExperience);
      return newExperience;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    const experienceFound = await this.experiencesRepository.findOneBy({ id });
    if (!experienceFound) throw new NotFoundException('Experience not found');
    await this.experiencesRepository.delete(id);

    return { deleted: true };
  }
}
