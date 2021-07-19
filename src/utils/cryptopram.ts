import * as crypto from 'crypto';

export function makeSalt(): string {
  //制作随机盐
  return crypto.randomBytes(3).toString('base64');
}

export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }

  const tempSalt = Buffer.from(salt, 'base64');

  //10000表示迭代的次数，16表示长度
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}
