import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from 'src/database/sequelize';
import { makeSalt, encryptPassword } from 'src/utils/cryptopram';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
            SELECT
                user_id userID, account_name accountName, real_name realName, passwd password,
                passwd_salt salt, mobile, role
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
    const { accountName, realName, password, repassword, mobile, email } =
      requestBody;
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

    const registerSQL = `
            INSERT INTO admin_user 
                (account_name, real_name, passwd, passwd_salt, mobile, email, user_status, role, create_by) 
            VALUES 
                ('${accountName}', '${realName}', '${password}', '${salt}', '${mobile}', ${email}, 1, 3, 0)
        `;

    try {
      await sequelize.query(registerSQL, { logging: false });
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
