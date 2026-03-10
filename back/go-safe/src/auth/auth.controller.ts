import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from 'src/instructors/dto/create-user-instructor.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
//import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth() {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return {
  //     message: 'Usuario autenticado con Google',
  //     user: req.user,
  //   };
  // }

  //@UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  @ApiBody({
    type: CreateUserDto,
    description: 'Create a new user',
    examples: {
      example1: {
        summary: 'User example',
        value: {
          fistName: 'Juan',
          lastName: 'Perez',
          userName: 'uPerez',
          documentType: 'CC',
          document: 123456789,
          genre: 'Male',
          age: 25,
          address: 'Calle 123 #45-67',
          phone: 3001234567,
          country: 'Colombia',
          city: 'Bogota',
          email: 'admin@admin.com',
          password: '15January!!',
          confirmPassword: '15January!!',
          rol: 'user',
          profilePic: 'https://example.com/avatar.jpg',
        },
      },
    },
  })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
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
