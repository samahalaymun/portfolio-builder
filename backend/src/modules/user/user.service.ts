import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  findAll() {
    return this.prisma.user.findMany();
  }
  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { portfolio: true }, // <-- include relation
    });
  }
  update(id: string, data: { name?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  create(data: {
    email: string;
    password: string;
    name?: string;
    username?: string;
  }) {
    return this.prisma.user.create({ data });
  }

  updateRefreshToken(userId: string, hash: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: hash },
    });
  }

  async changePassword(
    userId: string,
    dto: { currentPassword: string; newPassword: string },
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const match = await bcrypt.compare(dto.currentPassword, user.password);

    if (!match) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hash },
    });

    return { success: true };
  }
  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async updateResetToken(
    userId: string,
    data: { resetTokenHash: string; resetTokenExpiry: Date },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        resetTokenHash: data.resetTokenHash,
        resetTokenExpiry: data.resetTokenExpiry,
      },
    });
  }

  // ✅ NEW: Clear reset token (after successful reset)
  async clearResetToken(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        resetTokenHash: null,
        resetTokenExpiry: null,
      },
    });
  }

  // ✅ NEW: Find users with valid reset tokens
  async findUsersWithValidResetToken() {
    return this.prisma.user.findMany({
      where: {
        resetTokenExpiry: {
          gte: new Date(), // Token not expired
        },
        resetTokenHash: {
          not: null, // Has a token
        },
      },
    });
  }
}
