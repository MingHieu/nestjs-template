import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser('username') username: string) {
    return this.userService.find(username);
  }

  @Post('update')
  update(@Body() body: UpdateUserDto, @GetUser('username') username: string) {
    return this.userService.update(body, username);
  }
}
