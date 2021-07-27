import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  readonly email: string;
}

export class LoginInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsObject()
  readonly user: object;
}
