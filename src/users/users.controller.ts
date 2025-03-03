import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto, UpdateUserDto } from './dto';
import { PasswordChangeDto } from './dto/password-change.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createNewUser(@Body() dto: NewUserDto) {
    return this.usersService.createNewUser(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id/profile')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: PasswordChangeDto,
  ) {
    return this.usersService.updatePassword(
      id,
      dto.currentPassword,
      dto.newPassword,
    );
  }
}
