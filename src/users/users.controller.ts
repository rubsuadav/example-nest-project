import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile/:userId')
  public async getUserProfile(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<{ user: User }> {
    const user = await this.userService.getUserProfile(userId);
    if (!user) throw new NotFoundException('User not found');
    return { user };
  }

  @Patch('profile/:userId')
  public async updateUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateUserDto
  ): Promise<{ user: User }> {
    if (!data || !Object.keys(data).length) {
      const user = await this.getUserProfile(userId);
      return user;
    }

    const user = await this.userService.updateUserProfile(userId, data);
    if (!user) throw new NotFoundException('User not found');
    return { user };
  }

  @Patch('avatar/:userId')
  public async updateAvatar(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('avatarUrl') avatarUrl: string
  ): Promise<{ user: User }> {
    if (!avatarUrl) throw new BadRequestException('Avatar URL is required');

    const user = await this.userService.updateAvatar(userId, avatarUrl);
    if (!user) throw new NotFoundException('User not found');
    return { user };
  }
}
