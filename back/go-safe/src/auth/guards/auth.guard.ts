import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) return false;

    const token = authorization.split(' ')[1];
    if (!token) return false;

    const secret = process.env.JWT_SECRET;

    try {
      const user = this.jwtService.verify(token, { secret });

      user.iat = new Date(user.iat * 1000).toLocaleString();
      user.exp = new Date(user.exp * 1000).toLocaleString();

      request.user = user;
    } catch (error) {
      return false;
    }
    return true;
  }
}
