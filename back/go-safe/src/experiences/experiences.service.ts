import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { BuyExperienceDto } from './dto/buy-experience.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const instructorFound = await this.instructorRepository.findOne({
      where: [
        { id: createExperienceDto.instructorId },
        { user: { id: createExperienceDto.instructorId } },
      ],
      relations: { user: true },
    });

    if (!instructorFound) {
      throw new NotFoundException('Instructor not found');
    }
    try {
      console.log(createExperienceDto);
      const newExperience: Experience = this.experiencesRepository.create({
        ...createExperienceDto,
        instructor: instructorFound,
      });

      await this.experiencesRepository.save(newExperience);
      return {
        message: 'Experience created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(category?: string) {
    const where = category ? { category: ILike(category.trim()) } : {};
    const experiencesFound = await this.experiencesRepository.find({ where });
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

  async buyExperience(dto: BuyExperienceDto) {
    const user = await this.usersRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const experience = await this.experiencesRepository.findOneBy({
      id: dto.experienceId,
    });
    if (!experience) throw new NotFoundException('Experience not found');

    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'experiences')
      .of(dto.userId)
      .add(dto.experienceId);

    return { message: 'Experience purchased successfully' };
  }

  async getExperiencesByInstructor(instructorId: string) {
    const experiences = await this.experiencesRepository.find({
      where: {
        instructor: {
          id: instructorId,
        },
      },
      relations: ['instructor'],
    });

    return experiences;
  }

  async getExperiencesByUser(userId: string) {
    return await this.experiencesRepository
      .createQueryBuilder('experience')
      .innerJoin('experience.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
