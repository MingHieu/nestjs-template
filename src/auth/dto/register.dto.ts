import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @IsOptional()
  @MaxLength(255)
  name?: string;
}
