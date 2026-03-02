import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { PrismaService } from 'prisma/prisma.service';

import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwt: JwtService,
    private portfolioService: PortfolioService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    //Generate unique username from email
    const baseUsername = this.generateUsernameFromEmail(email);
    const username = await this.ensureUniqueUsername(baseUsername);
    const user = await this.userService.create({
      email,
      password: hash,
      name,
      username,
    });
    await this.portfolioService.create(user.id, {
      title: `${user.name ?? 'My'}`,
      content: {
        sectionsOrder: [
          'personalInfo',
          'education',
          'about',
          'contact',
          'photos',
        ],
        personalInfo: {
          email: user.email,
        },
      },
    });
    return this.issueTokens(user.id, user.email, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.issueTokens(user.id, user.email, user.role);
  }

  private async issueTokens(userId: string, email: string, role: string) {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      { expiresIn: '15m' },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId },
      { expiresIn: '7d' }, // 7 days - gives users time to use refresh without re-login
    );

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, refreshHash);

    return { accessToken, refreshToken };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.refreshTokenHash) {
      throw new UnauthorizedException(
        'User has logged out. Please login again.',
      );
    }

    // Verify JWT signature and expiration
    try {
      await this.jwt.verifyAsync(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }

    // Verify token matches stored hash
    const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Only issue a new access token, keep the same refresh token
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: '15m' },
    );

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }
  // Generate username from email
  private generateUsernameFromEmail(email: string): string {
    // Extract part before @
    const username = email.split('@')[0];

    // Clean up: lowercase, remove special chars, replace dots with hyphens
    return username
      .toLowerCase()
      .replace(/[^\w.-]/g, '')
      .replace(/\./g, '-')
      .replace(/-+/g, '-')
      .slice(0, 30); // Max 30 chars
  }

  // Ensure username is unique
  private async ensureUniqueUsername(baseUsername: string): Promise<string> {
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const existing = await this.userService.findByUsername(username);

      if (!existing) {
        return username;
      }

      username = `${baseUsername}${counter}`;
      counter++;
    }
  }
  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    // ✅ Don't reveal if email exists (security best practice)
    if (!user) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token to user
    await this.userService.updateResetToken(user.id, {
      resetTokenHash,
      resetTokenExpiry,
    });

    // ✅ TODO: Send email with reset link
    // For now, return token (in production, send via email)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    console.log('🔗 Password reset link:', resetLink);

    // In production, use email service:
    // await this.emailService.sendPasswordReset(user.email, resetLink);

    return {
      message: 'If the email exists, a reset link has been sent',
      // ⚠️ Remove this in production (only for testing):
      resetLink,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    // Find user with valid reset token
    const users = await this.prisma.user.findMany({
      where: {
        resetTokenExpiry: {
          gte: new Date(), // Token not expired
        },
      },
    });
   
    // Find user with matching token hash
    let user = null;
    // for (const u of users) {
    //   if (u.resetTokenHash) {
    //     const isValid = await bcrypt.compare(token, u.resetTokenHash);
    //     if (isValid) {
    //       user = u;
    //       break;
    //     }
    //   }
    // }

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    // await this.prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     password: hashedPassword,
    //     resetTokenHash: null,
    //     resetTokenExpiry: null,
    //   },
    // });

    return { message: 'Password reset successful' };
  }
}
