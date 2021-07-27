import {
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class NovelSearchInfoDTO {
  @IsString()
  readonly novelName: string;
}

export class GetChaptersInfoDTO {
  @IsNotEmpty({ message: 'chaptersUrl不能为空' })
  readonly chaptersUrl: string;
  @IsNotEmpty({ message: 'novelName不能为空' })
  readonly novelName: string;
}

export class GetTextContentInfoDTO {
  @IsNotEmpty({ message: 'chapterUrl不能为空' })
  readonly chapterUrl: string;
  @IsNotEmpty({ message: 'novelName不能为空' })
  readonly novelName: string;
  @IsNotEmpty({ message: 'chapterName不能为空' })
  readonly chapterName: string;
}

export class AddNovelInfoDTO {
  @IsNotEmpty({ message: 'auth不能为空' })
  readonly auth: string;
  @IsNotEmpty({ message: 'chaptersUrl不能为空' })
  readonly chaptersUrl: string;
  @IsNotEmpty({ message: 'clickNumber不能为空' })
  readonly clickNumber: string;
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: string;
  @IsNotEmpty({ message: 'latestChapterName不能为空' })
  readonly latestChapterName: string;
  @IsNotEmpty({ message: 'novelName不能为空' })
  readonly novelName: string;
  @IsNotEmpty({ message: 'novelUrl不能为空' })
  readonly novelUrl: string;
  @IsNotEmpty({ message: 'status不能为空' })
  readonly status: string;
  @IsNotEmpty({ message: 'type不能为空' })
  readonly type: string;
  @IsNotEmpty({ message: 'typrUrl不能为空' })
  readonly typeUrl: string;
  @IsNotEmpty({ message: 'updateTime不能为空' })
  readonly updateTime: string;
}

export class DeleteNovelInfoDTO {
  @IsNotEmpty({ message: 'auth不能为空' })
  readonly auth: string;
  @IsNotEmpty({ message: 'chaptersUrl不能为空' })
  readonly chaptersUrl: string;
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: string;
  @IsNotEmpty({ message: 'latestChapterName不能为空' })
  readonly latestChapterName: string;
  @IsNotEmpty({ message: 'novelName不能为空' })
  readonly novelName: string;
  @IsNotEmpty({ message: 'readingChapterName不能为空' })
  readonly readingChapterName: string;
  @IsNotEmpty({ message: 'readingChapterUrl不能为空' })
  readonly readingChapterUrl: string;
  @IsNotEmpty({ message: 'username不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: 'updateTime不能为空' })
  readonly updateTime: string;
}
