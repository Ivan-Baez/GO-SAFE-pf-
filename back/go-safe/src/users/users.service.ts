import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    let userFound = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (userFound) throw new ConflictException('Email already registered');

    userFound = await this.usersRepository.findOneBy({
      userName: user.userName,
    });

    if (userFound) throw new ConflictException('Username already registered');

    console.log(user.password, user.confirmPassword);
    if (user.password !== user.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);

      const newUser: User = this.usersRepository.create({
        ...user,
        password: hashedPassword,
      });

      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const usersFound = await this.usersRepository.find();
    return usersFound;
  }

  async findOne(id: string) {
    try {
      const userFound = await this.usersRepository.findOneBy({
        id,
      });

      if (!userFound) throw new NotFoundException('User not found');

      return userFound;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, user: UpdateUserDto) {
    if (user.email) {
      const userFound = await this.usersRepository.findOneBy({
        id,
      });
      if (!userFound) throw new NotFoundException('User not found');
    }

    try {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        const newUser: UpdateUserDto = {
          ...user,
          password: hashedPassword,
        };
        await this.usersRepository.update(id, newUser);
        return user;
      }

      const newUser = user;
      await this.usersRepository.update(id, newUser);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    const userFound = await this.usersRepository.findOneBy({ id });
    if (!userFound) throw new NotFoundException('User not found');
    console.log('delete');
    await this.usersRepository.delete(id);

    return { deleted: true };
  }
}
