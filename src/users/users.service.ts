import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async getUserProfile(userId: number): Promise<User | null> {
    return (await this.userRepository.existsBy({ id: userId }))
      ? this.userRepository.findOne({ where: { id: userId } })
      : null;
  }

  public async updateUserProfile(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    if (!(await this.getUserProfile(userId))) return null;

    await this.userRepository.update(userId, updateUserDto);
    return this.userRepository.findOneBy({ id: userId });
  }

  public async updateAvatar(
    userId: number,
    avatarUrl: string
  ): Promise<User | null> {
    const user = await this.getUserProfile(userId);
    if (!user) return null;

    user.avatar = avatarUrl;
    return this.userRepository.save(user);
  }
}
