import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInstructorDto } from './dto/create-user-instructor.dto';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInstructorDto) {
    let userFound = await this.usersRepository.findOneBy({
      email: data.user.email,
    });

    if (userFound) throw new ConflictException('Email already registered');

    userFound = await this.usersRepository.findOneBy({
      userName: data.user.userName,
    });

    if (userFound) throw new ConflictException('Username already registered');

    const user = this.usersRepository.create({
      ...data.user,
      role: 'instructor',
    });

    await this.usersRepository.save(user);

    const instructor = this.instructorRepository.create({
      ...data.instructor,
      user,
    });

    return await this.instructorRepository.save(instructor);
  }

  async findAll() {
    const usersFound = await this.usersRepository.find({
      relations: {
        instructorProfile: true,
      },
    });
    return usersFound;
  }

  async findOne(id: string) {
    try {
      const userFound = await this.usersRepository.find({
        where: { id },
        relations: {
          instructorProfile: true,
        },
      });

      if (!userFound) throw new NotFoundException('User not found');

      return userFound;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  async remove(id: string) {
    const instructor = await this.instructorRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    await this.instructorRepository.remove(instructor);

    await this.usersRepository.remove(instructor.user);

    return { message: 'Instructor removed successfully' };
  }
}
