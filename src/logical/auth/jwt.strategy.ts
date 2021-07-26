// src/logical/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { countTime } from 'src/utils/countTime';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  // async validate(payload: any) {
  //   console.log(`JWT验证 - Step 4: 被守卫调用`);
  //   console.log(payload)
  //   return { userId: payload.sub, username: payload.username, realName: payload.realName, role: payload.role };
  // }
  async validate(payload: any) {
    console.log(`JWT验证 - Step 5: 测试回调函数`);
    console.log(payload);

    countTime(payload.username);
    return {
      userId: payload.sub,
      username: payload.username,
      realName: payload.realName,
      role: payload.role,
    };
  }
}
