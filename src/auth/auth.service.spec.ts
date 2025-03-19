import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TypeORMSQLITETestModule } from '../../test/TypeORMSQLITETest.module';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeORMSQLITETestModule],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
