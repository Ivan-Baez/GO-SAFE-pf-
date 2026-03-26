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
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/auth/guards/roles.enum';
import bcrypt from 'bcrypt';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createInstructor(data: CreateUserInstructorDto) {
    await this.validateSingUpData(data.user);

    const hashedPassword = await bcrypt.hash(data.user.password, 12);

    const user = this.usersRepository.create({
      ...data.user,
      password: hashedPassword,
      role: Role.Instructor,
    });

    await this.usersRepository.save(user);

    const instructor = this.instructorRepository.create({
      ...data.instructor,
      user,
      //certifications: data.instructor.certifications,
    });

    await this.instructorRepository.save(instructor);

    return {
      message: 'Instructor created successfully',
    };
  }

  async findAllExpInstructor(id: string) {
    try {
      const userFound = await this.usersRepository.find({
        where: { id },
      });
      if (!userFound) throw new NotFoundException('User not found');

      //await this.experienceser
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const userFound = await this.usersRepository.find({
        where: { id },
        relations: {
          instructor: true,
        },
      });

      if (!userFound) throw new NotFoundException('User not found');

      return userFound;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: string, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  async remove(id: string) {
    const userFound = await this.usersRepository.findOneBy({ id });
    if (!userFound) throw new NotFoundException('User not found');

    try {
      await this.usersRepository.update(id, { status: false });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return { deleted: true };
  }

  async validateSingUpData(dto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: dto.email },
        { userName: dto.userName },
        { document: dto.document },
        { phone: dto.phone },
      ],
    });

    if (!existingUser) return;

    if (existingUser.email === dto.email) {
      throw new ConflictException('Email already registered');
    }

    if (existingUser.userName === dto.userName)
      throw new ConflictException('Username already taken');

    if (Number(existingUser.document) === Number(dto.document)) {
      throw new ConflictException('Document already registered');
    }

    if (Number(existingUser.phone) === Number(dto.phone))
      throw new ConflictException('Phone already registered');
  }
}
