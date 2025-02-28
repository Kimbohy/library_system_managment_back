import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  role?: string; // This will hold the role ID
}

export class UpdateUserDto {
  name: string;
  @IsEmail()
  email: string;
  avatar?: string;
}