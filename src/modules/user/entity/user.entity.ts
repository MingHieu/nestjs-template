import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @Exclude()
  id: number;

  username: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
