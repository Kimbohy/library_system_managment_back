import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

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
  phone?: string;
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
  @Type(() => Date)
  @IsDate()
  membershipStartDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  membershipEndDate?: Date;
}

export class NewUserDto extends UserWithMembershipDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
