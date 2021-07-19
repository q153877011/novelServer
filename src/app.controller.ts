import { Controller, Get, HttpCode, Param, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('123')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('234')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('888')
  // // @HttpCode(200)
  // sayBye(): string {
  //   return this.appService.getHello();
  // }
}
