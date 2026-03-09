import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/instructors/dto/create-user-instructor.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

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
