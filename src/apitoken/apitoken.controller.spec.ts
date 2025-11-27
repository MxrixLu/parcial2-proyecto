import { Test, TestingModule } from '@nestjs/testing';
import { ApitokenController } from './apitoken.controller';
import { ApitokenService } from './apitoken.service';

describe('ApitokenController', () => {
  let controller: ApitokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApitokenController],
      providers: [ApitokenService],
    }).compile();

    controller = module.get<ApitokenController>(ApitokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
