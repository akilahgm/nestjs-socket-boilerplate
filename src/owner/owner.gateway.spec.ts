import { Test, TestingModule } from '@nestjs/testing';
import { OwnerGateway } from './owner.gateway';

describe('AppGateway', () => {
  let gateway: OwnerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerGateway],
    }).compile();

    gateway = module.get<OwnerGateway>(OwnerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
