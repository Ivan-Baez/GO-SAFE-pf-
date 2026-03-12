import { Test, TestingModule } from '@nestjs/testing';
import { QaaController } from './qaa.controller';
import { QaaService } from './qaa.service';

describe('QaaController', () => {
  let controller: QaaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QaaController],
      providers: [QaaService],
    }).compile();

    controller = module.get<QaaController>(QaaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
