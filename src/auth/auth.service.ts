import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// local imports
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import {
  checkEmailAndPasswordEntered,
  checkPassword,
  validateEmailPasswordAndRole
} from 'src/validations/validate';
import { generateHashPassword, generateJwtToken } from 'src/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async register(
    createUserDto: CreateUserDto
  ): Promise<{ token: string }> {
    validateEmailPasswordAndRole(createUserDto);

    createUserDto.password = await generateHashPassword(createUserDto.password);
    const user = await this.userRepository.save(
      this.userRepository.create(createUserDto)
    );
    return generateJwtToken(user);
  }

  public async login(
    email: string,
    password: string
  ): Promise<{ token: string }> {
    checkEmailAndPasswordEntered(email, password);
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException({
        message: 'Invalid email'
      });
    }
    await checkPassword(password, user);

    return generateJwtToken(user);
  }
}
