import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

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
        console.log(user?.name, membershipStatus);

        return {
          ...user,
          ...membershipStatus,
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

  async createNewUser(dto: NewUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) throw new ForbiddenException('Email already in use');

    const hash = await AuthService.hashData(dto.password);

    const userRoleId = '0'; // 'User' role

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        hash,
        roleId: userRoleId,
      },
    });

    // Create membership if start and end dates are provided
    if (dto.membershipStartDate && dto.membershipEndDate) {
      await this.prisma.membership.create({
        data: {
          userId: newUser.id,
          startDate: new Date(dto.membershipStartDate),
          endDate: new Date(dto.membershipEndDate),
        },
      });
    }

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      roleId: newUser.roleId,
      avatar: newUser.avatar,
    };
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

    const now = new Date();
    const activeMembership = membership.find(
      (m) => m.startDate <= now && (m.endDate === null || m.endDate >= now),
    );

    const pendingMembership = membership.find((m) => m.startDate > now);

    return {
      membershipStatus: activeMembership
        ? 'Active'
        : pendingMembership
          ? 'Pending'
          : 'Inactive',
      startDate: activeMembership?.startDate || pendingMembership?.startDate,
      endDate: activeMembership?.endDate || pendingMembership?.endDate,
    };
  }
}
