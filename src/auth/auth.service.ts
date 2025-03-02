import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthResponse, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<AuthResponse> {
    const hash = await AuthService.hashData(dto.password);

    // Use the USER role with ID "0"
    const userRoleId = '0';

    // Make sure the role exists
    const roleExists = await this.prisma.roles.findUnique({
      where: { roleId: userRoleId },
    });

    if (!roleExists) {
      // Create the role if it doesn't exist
      await this.prisma.roles.create({
        data: {
          roleId: userRoleId,
          roleName: 'USER',
        },
      });
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        roleId: userRoleId, // Always use "0" for USER role
      },
      include: {
        role: true,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRTHash(newUser.id, tokens.refresh_token);

    return {
      tokens,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: {
          id: newUser.roleId,
          roleName: newUser.role.roleName,
        },
        avatar: newUser.avatar,
      },
    };
  }

  async signinLocal(dto: AuthDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        role: true,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRTHash(user.id, tokens.refresh_token);

    return {
      tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: {
          id: user.roleId,
          roleName: user.role.roleName,
        },
        avatar: user.avatar,
      },
    };
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    if (!user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRTHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRTHash(userId: string, rt: string) {
    const hash = await AuthService.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  static hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7, // 7 days
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
