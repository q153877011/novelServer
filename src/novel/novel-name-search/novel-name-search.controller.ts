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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NovelNameSearchService } from './novel-name-search.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserController } from 'src/logical/user/user.controller';
import { post } from 'jquery';
import {
  AddNovelInfoDTO,
  DeleteNovelInfoDTO,
  GetChaptersInfoDTO,
  GetTextContentInfoDTO,
  NovelSearchInfoDTO,
} from './nove.dto';

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
  @UsePipes(new ValidationPipe())
  async novelSearch(@Query() query: NovelSearchInfoDTO) {
    console.log('小说搜索中');
    return await this.novelNameService.searchNovel(query.novelName);
  }

  @Get('getChapters')
  @UsePipes(new ValidationPipe())
  async getChapters(@Query() query: GetChaptersInfoDTO) {
    console.log(query.novelName + ' 章节搜索中');
    return await this.novelNameService.getChapters(
      query.novelName,
      query.chaptersUrl,
    );
  }

  @Get('getTextContent')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async getContent(@Query() query: GetTextContentInfoDTO, @Request() req) {
    console.log('\n正在获取 ' + query.chapterName + ' 的内容');
    return this.novelNameService.getContent(query, req.user.username);
  }

  @Post('addNovel')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async addNovel(@Body() body: AddNovelInfoDTO, @Req() req) {
    console.log('\n小说添加中');
    return this.novelNameService.addNovel(body, req.user.username);
  }

  @Post('deleteNovel')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async deleteNovel(@Body() body: DeleteNovelInfoDTO, @Req() req) {
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
