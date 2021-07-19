import { Test, TestingModule } from '@nestjs/testing';
import { NovelNameSearchController } from './novel-name-search.controller';

describe('NovelNameSearchController', () => {
  let controller: NovelNameSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovelNameSearchController],
    }).compile();

    controller = module.get<NovelNameSearchController>(NovelNameSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
