import { IsEmail } from "class-validator";

export class UsersDto {
  id: string;
  @IsEmail()
  email: string;
  name: string;
  role: number;
  avatar: string;
}

export class UpdateUserDto {
  name: string;
  @IsEmail()
  email: string;
  avatar?: string;
}