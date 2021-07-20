import {
  Controller,
  Post,
  Request,
  Get,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NovelNameSearchService } from './novel-name-search.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserController } from 'src/logical/user/user.controller';
import { post } from 'jquery';

@Controller('novel')
export class NovelNameSearchController {
  constructor(private readonly novelNameService: NovelNameSearchService) {}

  @Get('search')
  @ApiParam({
    name: 'name',
    description: '这是需要搜索的内容',
  })
  @ApiResponse({
    status: 200,
    description: '搜索成功',
  })
  async novelSearch(@Query() query: any) {
    console.log('小说搜索中');
    return await this.novelNameService.searchNovel(query.novelName);
  }

  @Get('getChapters')
  async getChapters(@Query() query: any) {
    console.log(query.novelName + ' 章节搜索中');
    return await this.novelNameService.getChapters(
      query.novelName,
      query.chaptersUrl,
    );
  }

  @Get('getTextContent')
  @UseGuards(AuthGuard('jwt'))
  async getContent(@Query() query: any, @Request() req) {
    console.log('\n正在获取 ' + query.chapterName + ' 的内容');
    return this.novelNameService.getContent(query, req.user.username);
  }

  @Post('addNovel')
  @UseGuards(AuthGuard('jwt'))
  async addNovel(@Body() body, @Req() req) {
    console.log('\n小说添加中');
    return this.novelNameService.addNovel(body, req.user.username);
  }

  @Post('deleteNovel')
  @UseGuards(AuthGuard('jwt'))
  async deleteNovel(@Body() body, @Req() req) {
    console.log(body.novelName + ' 删除中');
    return this.novelNameService.deleteNovel(body, req.user.username);
  }

  @Get('getBookShelf')
  @UseGuards(AuthGuard('jwt'))
  async getBookShelf(@Req() req) {
    console.log('正在获取 ' + req.user.username + ' 的小说书架');
    return this.novelNameService.getBookShelf(req.user.username);
  }
}
