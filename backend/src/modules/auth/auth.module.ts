import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    PortfolioModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
