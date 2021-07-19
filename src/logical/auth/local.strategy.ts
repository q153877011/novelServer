// src/logical/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    // this.authService = authService;
  }

  async validate(username: string, password: string): Promise<any> {
    const result = await this.authService.validateUser(username, password);
    if (result.code == 1) {
      return this.authService.certificate(result.user);
    } else if (result.code == 2) {
      return {
        code: 402,
        msg: '密码错误',
      };
    } else if (result.code == 3) {
      return {
        code: 403,
        msg: '账号不存在',
      };
    }
  }
}
