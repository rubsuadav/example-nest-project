import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

// local imports
import { AuthService } from './auth.service';
import { TypeORMSQLITETestModule } from '../../test/TypeORMSQLITETest.module';
import { User } from '../users/entities/user.entity';
import { invalidCases } from '../../test/invalid-users';
import { invalidCasesLogin } from '../../test/invalid-user-credentials';

describe('AuthService', () => {
  let service: AuthService;
  let userRepositoryMock: Partial<Repository<User>>;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn().mockImplementation((user) => user),
      save: jest.fn().mockImplementation((user) => ({
        ...user
      })),
      findOneBy: jest.fn().mockImplementation((user) => ({
        ...user,
        password: '@Password1'
      }))
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeORMSQLITETestModule],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: '@Password1'
    };

    const token = await service.register(user);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
    expect(userRepositoryMock.save).toHaveBeenCalled();
    expect(token).toHaveProperty('token');
  });

  it.each(invalidCases)('$description', async ({ user, expectedError }) => {
    await expect(service.register(user)).rejects.toThrow(
      new BadRequestException({ message: expectedError })
    );
  });

  it.each(invalidCasesLogin)(
    '$description',
    async ({ user, expectedError }) => {
      await expect(service.login(user.email, user.password)).rejects.toThrow(
        new BadRequestException({ message: expectedError })
      );
    }
  );
});
