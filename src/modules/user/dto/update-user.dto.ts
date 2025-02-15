import { IsOptional, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @MaxLength(255)
  password?: string;
}
