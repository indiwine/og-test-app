import { Test, TestingModule } from '@nestjs/testing';
import { HelloResolverService } from './hello.resolver.service';

describe('HelloResolverService', () => {
  let service: HelloResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloResolverService],
    }).compile();

    service = module.get<HelloResolverService>(HelloResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
