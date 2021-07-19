import { Body, Injectable } from '@nestjs/common';
import { insert, query } from '../../utils/database';
import { TimeoutError } from 'rxjs';
import { Imessage } from 'src/assets/interface/iterface';
import sequelize from 'src/database/sequelize';
import { searchNovel, getChapters, getContent } from 'src/utils/getMessage';
import { first } from 'cheerio/lib/api/traversing';
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

  async getContent(@Body() body: any): Promise<any> {
    const { novelName, chapterName, chapterUrl } = body;
    let page = await getContent(chapterUrl);

    let $ = Cheerio.load(page);
    let result = $('.page-content');
    let content = result.text();

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
    console.log(username + ' ' + body.novelName);
    const querySql = `
      SELECT
        *
      FROM 
        belong
      WHERE
        username = '${username}' and novelName = '${body.novelName}'
    `;
    const content = await query(querySql);
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
      console.log('++++++++++++++++++++');
      console.log(firstChapter);
    } catch (error) {
      return {
        code: 403,
        msg: '章节获取错误',
      };
    }
    const insertBelongSql = `
      INSERT INTO belong
        (username, novelName, readingChapterName, readingChapterUrl, chaptersUrl, auth, latestChapterName, updateTime) 
      VALUES 
        ('${username}', '${body.novelName}', '${firstChapter.chapterName}', '${firstChapter.chapterUrl}', 
        '${body.chaptersUrl}', '${body.auth}', '${body.latestChapterName}', '${body.updateTime}')
    `;

    const result = await insert(insertBelongSql);

    const insertTotalNovelSql = `
      INSERT INTO totalnovel
        (novelName, chaptersUrl, updateTime, auth, status, type, novelUrl, latestChapterName, clickNumber)
      VALUES
        ('${body.novelName}','${body.chaptersUrl}','${body.updateTime}', '${body.auth}','${body.status}', 
        '${body.type}','${body.novelUrl}','${body.latestChapterName}', '${body.clickNumber}')
    `;
    console.log('5555555555555555555555555555');

    await insert(insertTotalNovelSql);

    return result;
  }

  async getBookShelf(username: string): Promise<any> {
    const queryBelongSql = `
      SELECT
        *
      FROM
        belong
      WHERE
        username = '${username}'
    `;

    try {
      const result = await query(queryBelongSql);
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
