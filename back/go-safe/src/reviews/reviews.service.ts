import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewsRepository: Repository<Reviews>,
  ) {}

  findAll() {
    return this.reviewsRepository.find();
  }

  create(createReviewDto: CreateReviewDto) {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
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
