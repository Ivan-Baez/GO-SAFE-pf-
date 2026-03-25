import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Experience } from 'src/experiences/entities/experience.entity';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,

    @InjectRepository(Reviews)
    private reviewsRepository: Repository<Reviews>,

    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
  ) {}

  findAll() {
    return this.reviewsRepository.find();
  }

  async createReview(dto: CreateReviewDto, userId: string) {
    // 1. Validar experiencia
    const experienceExists = await this.experiencesRepository.findOne({
      where: { id: dto.experienceId },
    });

    if (!experienceExists) {
      throw new NotFoundException('Experience not found');
    }

    // 2. Validar que el usuario compró la experiencia
    const hasBought = await this.experiencesRepository
      .createQueryBuilder('e')
      .innerJoin('e.users', 'u')
      .where('e.id = :expId', { expId: dto.experienceId })
      .andWhere('u.id = :userId', { userId })
      .getExists();

    if (!hasBought) {
      throw new ForbiddenException('User has not purchased this experience');
    }

    // 3. Crear review
    const review = this.reviewsRepository.create({
      rate: dto.rate,
      commentary: dto.commentary,
      user: { id: userId },
      experience: { id: dto.experienceId },
    });

    await this.reviewsRepository.save(review);

    return {
      message: 'Review created successfully',
    };
  }

  async findReviewsByInstructor(instructorId: string) {
    // 1. Validar que exista el instructor
    const exists = await this.instructorRepository.findOne({
      where: { id: instructorId },
    });

    if (!exists) {
      throw new NotFoundException('Instructor not found');
    }

    // 2. Query principal
    const reviews = await this.reviewsRepository
      .createQueryBuilder('r')
      .innerJoin('r.experience', 'e')
      .innerJoin('e.instructor', 'i')
      .innerJoin('r.user', 'u')
      .where('i.id = :instructorId', { instructorId })
      .select([
        'u.userName AS "userName"',
        'r.rate AS "rate"',
        'r.commentary AS "commentary"',
        `TO_CHAR(r."createdAt", 'DD-MM-YYYY') AS "date"`,
        'e.title AS "experienceTitle"',
        'e.location AS "location"',
      ])
      .orderBy('r."createdAt"', 'DESC')
      .getRawMany();

    return reviews;
  }
}

// async findAll() {
//   return this.reviewsRepository.find({
//     relations: ['user', 'experience'],
//   });
// }

// async create(createReviewDto: CreateReviewDto) {
//   const review = this.reviewsRepository.create({
//     rate: createReviewDto.rate,
//     commentary: createReviewDto.commentary,
//     user: { id: createReviewDto.userId },
//     experience: { id: createReviewDto.experienceId },
//   });

//   return this.reviewsRepository.save(review);
// }
