import { IsNotEmpty, IsString } from 'class-validator';
import { UsersDto } from 'src/users/dto';

export class CreateAdminDto extends UsersDto {
    @IsNotEmpty()
    @IsString()
    password: string
}
