import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/auth/dto';

export class CreateUserDto extends PartialType(RegisterDto) {}
