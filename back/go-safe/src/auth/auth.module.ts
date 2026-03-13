import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { InstructorsModule } from 'src/instructors/instructors.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [UsersModule, PassportModule, InstructorsModule],
})
export class AuthModule {}
