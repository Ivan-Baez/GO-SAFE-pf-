import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  CreateUserInstructorDto,
  LoginDto,
} from 'src/instructors/dto/create-user-instructor.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { InstructorsService } from '../instructors/instructors.service';
import { Role } from './guards/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly instructorsService: InstructorsService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const googleUser = req.user;

    const result = await this.userService.googleLogin(googleUser);

    if (result.exists) {
      return res.redirect(
        `${process.env.URL_FRONT}/google-success?token=${result.token}`,
      );
    }

    return res.redirect(
      `${process.env.URL_FRONT}/register?token=${result.token}`,
    );
  }

  //@UseInterceptors(ClassSerializerInterceptor)
  @Post('signup-user')
  @ApiBody({
    type: CreateUserDto,
    description: 'Create a new user',
    examples: {
      example1: {
        summary: 'User example',
        value: {
          firstName: 'Juan',
          lastName: 'Perez',
          userName: 'uPerez',
          documentType: 'CC',
          document: 123456789,
          genre: 'Male',
          birthdate: '13-05-1994',
          address: 'Calle 123 #45-67',
          phone: 3001234567,
          country: 'Colombia',
          city: 'Bogota',
          email: 'admin@admin.com',
          password: '15January!!',
          confirmPassword: '15January!!',
          role: Role.User,
          profilePic: 'https://example.com/avatar.jpg',
        },
      },
    },
  })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('signup-instructor')
  @ApiBody({
    type: CreateUserInstructorDto,
    description: 'Create a new user',
    examples: {
      example1: {
        summary: 'User example',
        value: {
          user: {
            firstName: 'Carlos',
            lastName: 'Ramirez',
            documentType: 'CC',
            userName: 'gazas',
            document: 987654321,
            genre: 'Male',
            birthdate: '13-05-1994',
            address: 'Calle 45 #23-10',
            phone: 3011234567,
            country: 'Colombia',
            city: 'Bogota',
            email: 'admin@admin.com',
            password: '15January!!',
            profilePic: 'https://example.com/profile.jpg',
          },
          instructor: {
            career: 'Lincenciado en deportes',
            institution: 'Servicio de eduacion nacional',
            level: 'Profesional',
            period: '2002-2004',
            onCourse: true,
            about:
              'Professional climbing instructor with 10 years of experience',
            certifications: [
              {
                title: 'firts aid',
                url: 'www.certificate.com',
              },
              {
                title: 'second aid',
                url: 'www.certificate.com',
              },
            ],
          },
        },
      },
    },
  })
  createInstructor(@Body() body: CreateUserInstructorDto) {
    return this.instructorsService.createInstructor(body);
  }

  @Post('signin')
  @ApiBody({
    type: CreateUserDto,
    description: 'Login a user',
    examples: {
      example2: {
        summary: 'User example',
        value: {
          email: 'admin@admin.com',
          password: '15January!!',
        },
      },
    },
  })
  loginUser(@Body() credentials: LoginDto) {
    return this.userService.loginUser(credentials);
  }
}
