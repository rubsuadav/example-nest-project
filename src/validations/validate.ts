import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// local imports
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export function validateEmailPasswordAndRole(
  createUserDto: CreateUserDto
): void {
  if (
    !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(createUserDto.email)
  ) {
    throw new BadRequestException({
      message: 'Email must be from gmail, hotmail or outlook'
    });
  }
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(createUserDto.password)) {
    throw new BadRequestException({
      message:
        'Password must be 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character and 8 characters long'
    });
  }

  if (
    createUserDto.role &&
    ['admin', 'user'].indexOf(createUserDto.role) === -1
  ) {
    throw new BadRequestException({
      message: 'Role must be either admin or user'
    });
  }
}

export function checkEmailAndPasswordEntered(
  email: string,
  password: string
): void {
  if (!email) {
    throw new BadRequestException({
      message: 'Email is required'
    });
  } else if (!password) {
    throw new BadRequestException({
      message: 'Password is required'
    });
  }
}

export async function checkPassword(
  password: string,
  user: User
): Promise<void> {
  if (!(await bcrypt.compare(password, user.password))) {
    throw new BadRequestException({
      message: 'Password is incorrect'
    });
  }
}
