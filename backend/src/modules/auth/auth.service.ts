import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new Error('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      email,
      password: hash,
      name,
    });

    return this.issueTokens(user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException();

    return this.issueTokens(user.id, user.email);
  }

  private async issueTokens(userId: string, email: string) {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      { expiresIn: '15m' },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId },
      { expiresIn: '7d' },
    );

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, refreshHash);

    return { accessToken, refreshToken };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!valid) throw new UnauthorizedException();

    return this.issueTokens(user.id, user.email);
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }
}
