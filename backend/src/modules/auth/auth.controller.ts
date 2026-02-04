import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.auth.register(
      dto.email,
      dto.password,
      dto.name,
    );

    this.setRefreshCookie(res, refreshToken);
    return { accessToken };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.auth.login(
      dto.email,
      dto.password,
    );

    this.setRefreshCookie(res, refreshToken);
    return { accessToken };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refresh_token'];
    const payload: any = this.auth['jwt'].decode(token);

    const { accessToken, refreshToken } = await this.auth.refresh(
      payload.sub,
      token,
    );

    this.setRefreshCookie(res, refreshToken);
    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['refresh_token'];
    if (token) {
      const payload: any = this.auth['jwt'].decode(token);
      await this.auth.logout(payload.sub);
    }

    res.clearCookie('refresh_token');
    return { success: true };
  }

  private setRefreshCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: true, // false فقط بالـ local dev
      sameSite: 'strict',
      path: '/auth/refresh',
    });
  }
}
