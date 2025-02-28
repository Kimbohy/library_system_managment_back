import { IsEmail, IsNotEmpty } from "class-validator";

export class UsersDto {
  id: string;
  @IsNotEmpty()
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