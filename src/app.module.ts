// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
// import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { NovelNameSearchService } from './novel/novel-name-search/novel-name-search.service';
import { NovelNameSearchController } from './novel/novel-name-search/novel-name-search.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, UserController, NovelNameSearchController],
  providers: [AppService, NovelNameSearchService],
})
export class AppModule {}
