import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ enum: ['admin', 'user'], default: 'user' })
  role: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Post, (post) => post.owner, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  posts: Post[];
}
