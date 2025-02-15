import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserEntity } from 'src/modules/user/entity';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayloadDto, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  signToken(user: UserEntity) {
    const payload: JwtPayloadDto = {
      sub: user.username,
      username: user.username,
    };

    return this.jwtService.sign(payload, {
      // expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }

  async createAuthResponse(user: UserEntity) {
    return {
      user,
      token: this.signToken(user),
    };
  }

  async register(body: RegisterDto) {
    try {
      const hashPassword = await argon.hash(body.password);
      const user = await this.userService.create({
        ...body,
        password: hashPassword,
      });
      return this.createAuthResponse(user);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code == 'P2002') {
        throw new ForbiddenException('Tài khoản đã tồn tại');
      }
      throw e;
    }
  }

  async login(body: LoginDto) {
    const { username, password } = body;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new ForbiddenException('Tài khoản không tồn tại');

    const pwMatches = await argon.verify(user.password, password);
    if (!pwMatches)
      throw new ForbiddenException(
        'Mật khẩu không đúng. Hãy kiểm tra và thử lại',
      );

    return this.createAuthResponse(new UserEntity(user));
  }
}
