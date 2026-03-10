import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { LoginDto } from 'src/instructors/dto/create-user-instructor.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return {
      message: 'Usuario autenticado con Google',
      user: req.user,
    };
  }

  //@UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('signin')
  loginUser(@Body() credentials: LoginDto) {
    return this.userService.loginUser(credentials);
  }
}
