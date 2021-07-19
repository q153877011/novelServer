import { Test, TestingModule } from '@nestjs/testing';
import { NovelNameSearchService } from './novel-name-search.service';

describe('NovelNameSearchService', () => {
  let service: NovelNameSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NovelNameSearchService],
    }).compile();

    service = module.get<NovelNameSearchService>(NovelNameSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
