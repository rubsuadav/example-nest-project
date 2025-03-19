import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeORMSQLITETestModule } from '../../test/TypeORMSQLITETest.module';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeORMSQLITETestModule],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
