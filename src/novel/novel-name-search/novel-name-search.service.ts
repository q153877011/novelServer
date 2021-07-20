import { Body, Injectable, Query } from '@nestjs/common';
import {
  insertBelong,
  insertTotalNovel,
  query,
  update,
} from '../../utils/database';
import { Imessage } from 'src/assets/interface/iterface';
import { searchNovel, getChapters, getContent } from 'src/utils/getMessage';
import { belongTable } from 'src/database/table';
var Cheerio = require('cheerio');
@Injectable()
export class NovelNameSearchService {
  async searchNovel(name: string): Promise<any> {
    let temp: Imessage = {
      id: 1,
      type: '',
      typeUrl: '',
      novelName: '',
      novelUrl: '',
      latestChapterName: '',
      chaptersUrl: '',
      updateTime: '',
      auth: '',
      status: '',
      clickNumber: '',
    };

    let page = await searchNovel(name);
    let $ = Cheerio.load(page);
    let list = [];

    let result = $('table td');
    // console.log(result.text());
    result.each((index, item) => {
      switch (index % 8) {
        case 0:
          temp.id = Number($(item).text());
          break;
        case 1:
          item = $(item).find('a');
          temp.type = $(item).text();
          temp.typeUrl = $(item).attr('href');
          break;
        case 2:
          item = $($(item)).find('a');
          temp.novelName = $(item).text();
          temp.novelUrl = $(item).attr('href');
          break;
        case 3:
          item = $($(item)).find('a');
          temp.latestChapterName = $(item).text();
          temp.chaptersUrl = $(item).attr('href');
          break;
        case 4:
          temp.updateTime = $(item).text();
          break;
        case 5:
          temp.auth = $(item).text();
          break;
        case 6:
          temp.status = $(item).text();
          break;
        case 7:
          temp.clickNumber = $(item).text();
          list.push({ ...temp });
          break;
      }
    });
    return {
      code: 200,
      data: {
        list,
      },
      msg: 'success',
    };
  }

  async getChapters(novelName: string, chaptersUrl: string): Promise<any> {
    let page = await getChapters(chaptersUrl);
    let $ = Cheerio.load(page);
    let result = $('li');
    let list = [];
    result.each((index, item) => {
      let chapterUrl = $($(item).find('a')).attr('href');
      let chapterName = $($(item).find('a')).text();

      list.push({
        chapterUrl,
        chapterName,
      });
    });

    return {
      code: 200,
      data: {
        novelName,
        chapters: list,
      },
    };
  }

  async getContent(@Query() query: any, username: string): Promise<any> {
    const { chapterUrl, novelName, chapterName } = query;
    let page = await getContent(chapterUrl);

    let $ = Cheerio.load(page);
    let result = $('.page-content');
    let content = result.text();

    update(query, username);

    return {
      code: 200,
      data: {
        novelName,
        chapterName,
        content,
      },
    };
  }

  async addNovel(@Body() body: any, username: string): Promise<any> {
    let select = { username: username, novelName: body.novelName };
    const content = await query(select);
    if (content.length != 0) {
      return {
        code: 402,
        msg: '该小说已经添加',
      };
    }

    let chapters = {
      code: 0,
      data: {
        chapters: [],
      },
    };
    let firstChapter = {
      chapterName: '',
      chapterUrl: '',
    };
    try {
      chapters = await this.getChapters(body.novelName, body.chaptersUrl);
      firstChapter = chapters.data.chapters[0];
    } catch (error) {
      return {
        code: 403,
        msg: '章节获取错误',
      };
    }

    const insertBelongValue = {
      username: username,
      novelName: body.novelName,
      readingChapterName: firstChapter.chapterName,
      readingChapterUrl: firstChapter.chapterUrl,
      chaptersUrl: body.chaptersUrl,
      auth: body.auth,
      latestChapterName: body.latestChapterName,
      updateTime: body.updateTime,
    };
    const result = await insertBelong(insertBelongValue);

    const insertTotalNovelValue = {
      novelName: body.novelName,
      chaptersUrl: body.chaptersUrl,
      updateTime: body.updateTime,
      auth: body.auth,
      status: body.status,
      type: body.type,
      novelUrl: body.novelUrl,
      latestChapterName: body.latestChapterName,
      clickNumber: body.clickNumber,
    };

    await insertTotalNovel(insertTotalNovelValue);

    return result;
  }

  async deleteNovel(@Body() body: any, username: string): Promise<any> {
    try {
      let belong = belongTable();
      let result = await belong.destroy({
        where: { username: username, novelName: body.novelName },
      });

      if (result) {
        return {
          code: 200,
          msg: 'success',
        };
      } else {
        return {
          code: 501,
          msg: 'fail',
        };
      }
    } catch (error) {
      return {
        code: 502,
        msg: 'fail' + error,
      };
    }
  }

  async getBookShelf(username: string): Promise<any> {
    try {
      const select = { username: username };
      const result = await query(select);
      return {
        code: 200,
        result,
      };
    } catch (error) {
      return {
        code: 501,
        type: 'fail',
        msg: '数据库查询失败' + error,
      };
    }
  }
}
