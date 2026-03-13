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
  ) { }

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
      throw new InternalServerErrorException(error);
    }
  }

  async loginUser(credentials: LoginDto) {
    const userFound = await this.usersRepository.findOneBy({
      email: credentials.email,
    });

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
        role: userFound.role,
      };
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

    let user = await this.usersRepository.findOne({
      where: { email }
    });

    if (!user) {

      const newUser: DeepPartial<User> = {
        email: email,
        fistName: firstName || "Google",
        lastName: lastName || "User",
        userName: email.split("@")[0],
        documentType: "N/A",
        document: 0,
        genre: "N/A",
        birthdate: Date.now(),
        address: "N/A",
        phone: 0,
        country: "N/A",
        city: "N/A",
        password: "GOOGLE_AUTH",
        role: "User",
        profilePic: picture,
        status: true
      };

      user = this.usersRepository.create(newUser);
      await this.usersRepository.save(user);
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return this.jwtService.sign(payload);
  }
}
