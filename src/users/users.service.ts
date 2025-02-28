import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return user;
  }

  async updatePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ) {
    // Find the user
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Verify current password
    const passwordMatches = await bcrypt.compare(currentPassword, user.hash);
    if (!passwordMatches) {
      throw new ForbiddenException('Current password is incorrect');
    }

    // Hash the new password
    const hash = await this.hashData(newPassword);

    // Update the user's password
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hash,
      },
    });

    return {
      success: true,
      message: 'Password updated successfully',
    };
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
