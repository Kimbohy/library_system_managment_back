import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersDto } from 'src/users/dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(dto: CreateAdminDto) {
    const hash = await AuthService.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        hash,
        name: dto.name,
        email: dto.email,
        role: dto.role,
        avatar: dto.avatar,
      },
    });
    return newUser;
  }
}
