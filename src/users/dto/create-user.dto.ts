import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 20, { message: 'Name must be between 3 and 20 characters' })
  name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @Length(3, 20, { message: 'Last name must be between 3 and 20 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @IsOptional()
  role?: string;
}
