import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(dto: CreateAdminDto) {
    const hash = await AuthService.hashData(dto.password);

    // Use the ADMIN role with ID "1"
    const adminRoleId = '1';

    // Make sure the role exists
    const roleExists = await this.prisma.roles.findUnique({
      where: { roleId: adminRoleId },
    });

    if (!roleExists) {
      // Create the role if it doesn't exist
      await this.prisma.roles.create({
        data: {
          roleId: adminRoleId,
          roleName: 'ADMIN',
        },
      });
    }

    const newUser = await this.prisma.user.create({
      data: {
        hash,
        name: dto.name,
        email: dto.email,
        avatar: dto.avatar,
        roleId: adminRoleId, // Always use "1" for ADMIN role
      },
      include: {
        role: true,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: {
        id: newUser.roleId,
        roleName: newUser.role.roleName,
      },
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }
}
