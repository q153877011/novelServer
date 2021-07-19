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
  async getContent(@Query() query: any) {
    console.log('\n正在获取 ' + query.chapterName + ' 的内容');
    console.log(query);
    return this.novelNameService.getContent(query);
  }

  @Post('addNovel')
  @UseGuards(AuthGuard('jwt'))
  async addNovel(@Body() body, @Req() req) {
    console.log('\n小说添加中');
    console.log(body);
    return this.novelNameService.addNovel(body, req.user.username);
  }

  @Get('getBookShelf')
  @UseGuards(AuthGuard('jwt'))
  async getBookShelf(@Req() req) {
    console.log('正在获取 ' + req.user.username + ' 的小说书架');
    return this.novelNameService.getBookShelf(req.user.username);
  }
}
