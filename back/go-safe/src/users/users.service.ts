import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LoginDto } from 'src/instructors/dto/create-user-instructor.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/auth/guards/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto) {
    await this.validateSingUpData(user);

    if (user.password !== user.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);

      const newUser: User = this.usersRepository.create({
        ...user,
        password: hashedPassword,
        role: Role.User,
      });

      await this.usersRepository.save(newUser);
      return {
        message: 'User created successfully',
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async loginUser(credentials: LoginDto) {
    const email = credentials.email?.trim().toLowerCase();

    const userFound = await this.usersRepository
      .createQueryBuilder('user')
      .where('LOWER(TRIM(user.email)) = :email', { email })
      .getOne();

    if (!userFound)
      throw new UnauthorizedException('Email or password incorrect!');

    try {
      const match = await bcrypt.compare(
        credentials.password,
        userFound.password,
      );

      if (!match)
        throw new UnauthorizedException('Email or password incorrect!');

      const payload = {
        id: userFound.id,
        email: userFound.email,
        role: userFound.role,
      };

      const token = this.jwtService.sign(payload);
      return {
        login: true,
        access_token: token,
        user: {
          id: userFound.id,
          name: `${userFound.firstName} ${userFound.lastName}`,
          email: userFound.email,
          address: userFound.address,
          phone: String(userFound.phone),
          orders: userFound.orders ?? [],
        },
        role: userFound.role,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
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

  async googleLogin(googleUser: any) {
    const { email, firstName, lastName, picture } = googleUser;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    const payload = user
      ? {
          id: user.id,
          email: user.email,
          role: user.role,
        }
      : {
          email,
          firstName,
          lastName,
          picture,
        };

    const token = this.jwtService.sign(payload);

    return {
      token,
      exists: !!user,
    };
  }
}
