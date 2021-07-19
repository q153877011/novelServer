import sequelize from 'src/database/sequelize';
import * as Sequelize from 'sequelize';

export async function query(sql: string): Promise<any> {
  try {
    const result = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: true,
    });
    return result;
  } catch (error) {
    console.log(error);
    return void 0;
  }
}

export async function insert(sql: string): Promise<any> {
  try {
    const result = await sequelize.query(sql, {
      logging: true,
    });
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

export async function createNovel(name: string): Promise<any> {
  const sql = `
        CREATE TABLE ${name}
        (
            id int identity(1,1) primary key,
            chapterName varchar(255),
            content varchar(16000), 
        )
    `;
}
