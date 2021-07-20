import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() request): Promise<any> {
    console.log('JWT验证 - step 1: 用户请求登录');
    return request.user;
  }

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() body: any, @Req() req) {
    return await this.userService.register(body);
  }
}
