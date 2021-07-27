import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { LoginInfoDTO, RegisterInfoDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UsePipes(new ValidationPipe())
  async login(@Request() request: LoginInfoDTO): Promise<any> {
    console.log('JWT验证 - step 1: 用户请求登录');
    return request.user;
  }

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: RegisterInfoDTO) {
    console.log(body);
    return await this.userService.register(body);
  }
}
