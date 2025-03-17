import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  protected async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<{ token: string }> {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      if (error instanceof Error && 'detail' in error) {
        throw new ConflictException({
          message: error.detail
        });
      }
      throw error;
    }
  }

  @Post('/login')
  protected async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<{ token: string }> {
    return await this.authService.login(email, password);
  }
}
