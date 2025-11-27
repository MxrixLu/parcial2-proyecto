import { Test, TestingModule } from '@nestjs/testing';
import { ApitokenService } from './apitoken.service';

describe('ApitokenService', () => {
  let service: ApitokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApitokenService],
    }).compile();

    service = module.get<ApitokenService>(ApitokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
