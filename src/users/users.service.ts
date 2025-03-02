import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      // Exclude sensitive fields
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        phone: true,
        roleId: true,
      },
    });

    // Add membership status for each user
    const usersWithMembershipStatus = await Promise.all(
      users.map(async (user) => {
        const membershipStatus = await this.getMembershipStatus(user.id);
        return {
          ...user,
          membershipStatus,
        };
      }),
    );

    return usersWithMembershipStatus;
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

  private async getMembershipStatus(userId) {
    const membership = await this.prisma.membership.findMany({
      where: {
        userId: userId,
      },
    });
    let currantStatus = 'Inactive';
    membership.forEach((element) => {
      if (element.endDate && element.endDate > new Date()) {
        currantStatus = 'Active';
      }
    });
    return currantStatus;
  }
}
