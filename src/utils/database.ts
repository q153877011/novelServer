import sequelize from 'src/database/sequelize';
import * as Sequelize from 'sequelize';
import { extend } from 'jquery';
import { Query } from '@nestjs/common';
import { belongTable, totalNovelTable, userTable } from 'src/database/table';

export async function query(select: object): Promise<any> {
  try {
    let belong = belongTable();
    let result = await belong.findAll({
      where: select,
    });
    return result;
  } catch (error) {
    console.log(error);
    return void 0;
  }
}

export async function insertBelong(insertValue: object): Promise<any> {
  try {
    let belong = belongTable();
    await belong.create(insertValue);
    return {
      code: 200,
      msg: 'success',
    };
  } catch (error) {
    return {
      code: 401,
      msg: error,
    };
  }
}

export async function insertTotalNovel(insertValue: object): Promise<any> {
  try {
    let totalnovel = totalNovelTable();
    await totalnovel.create(insertValue);
    return {
      code: 200,
      msg: 'success',
    };
  } catch (error) {
    return {
      code: 401,
      msg: error,
    };
  }
}

// 更新正在阅读章节
export async function update(query: any, username: string): Promise<any> {
  let belong = belongTable();
  await belong
    .update(
      {
        readingChapterName: query.chapterName,
        readingChapterUrl: query.chapterUrl,
      },
      {
        where: {
          username: username,
          novelName: query.novelName,
        },
      },
    )
    .then(() => {
      console.log(query.novelName + '正在阅读章节更新成功');
    })
    .catch((error) => {
      console.log(query.novelName + '正在阅读章节更新失败');
    });
}

export async function userInsert(data: object): Promise<any> {
  try {
    let user = await userTable();
    await user.create(data);
    return {
      code: 200,
      msg: 'success',
    };
  } catch (error) {
    return {
      code: 401,
      msg: '注册失败' + error,
    };
  }
}
