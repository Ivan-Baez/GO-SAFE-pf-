import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard)
  @ApiBody({
    type: CreateReviewDto,
    description: 'Create a new review',
    examples: {
      example1: {
        summary: 'User example',
        value: {
          rate: 5,
          commentary: 'good experience',
          experienceId: 'ca91025f-e064-4923-810d-a707f39b1ec7',
        },
      },
    },
  })
  @Post()
  createReview(@Body() dto: CreateReviewDto, @Req() req) {
    console.log('review::: ', req.user.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId = req.user.id;
    return this.reviewsService.createReview(dto, userId);
  }
}
// @Get()
// findAll() {
//   return this.reviewsService.findAll();
// }

// @Post()
// create(@Body() createReviewDto: CreateReviewDto) {
//   return this.reviewsService.create(createReviewDto);
// }
