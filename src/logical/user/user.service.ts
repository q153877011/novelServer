import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from 'src/database/sequelize';
import { makeSalt, encryptPassword } from 'src/utils/cryptopram';
import { userInsert } from 'src/utils/database';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
            SELECT
               *
            FROM
                admin_user
            WHERE
                account_name = '${username}'
        `;

    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
          logging: true,
        })
      )[0];

      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  async register(requestBody: any): Promise<any> {
    const { accountName, password, repassword, email } = requestBody;
    console.log(requestBody);
    if (password != repassword) {
      return {
        code: 400,
        msg: '两次密码不一致',
      };
    }

    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户名已存在',
      };
    }

    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const value = {
      account_name: accountName,
      real_name: '',
      passwd: password,
      passwd_salt: salt,
      mobile: '',
      user_status: 1,
      create_time: String(new Date().toJSON()),
      update_time: String(new Date().toJSON()),
      update_by: 0,
      role: 3,
      create_by: 0,
    };

    try {
      await userInsert(value);
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error ${error}`,
      };
    }
  }
}
