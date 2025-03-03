import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UsersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  role?: string; // This will hold the role ID

  @IsOptional()
  @IsPhoneNumber()
  phone?: string
}

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  avatar?: string;
}

export class UserWithMembershipDto extends UsersDto {
  @IsOptional()
  @IsDate()
  membershipStartDate?: Date;

  @IsOptional()
  @IsDate()
  membershipEndDate?: Date;
}

export class NewUserDto extends UserWithMembershipDto {
  @IsNotEmpty()
  @IsString()
  password: string
}