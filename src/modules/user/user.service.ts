import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ username, password, name }: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: { username, password, name },
    });
    return new UserEntity(user);
  }

  async find(username: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { username },
    });
    return new UserEntity(user);
  }

  async update(body: UpdateUserDto, username: string) {
    const user = await this.prisma.user.update({
      where: { username },
      data: body,
    });
    return new UserEntity(user);
  }
}
