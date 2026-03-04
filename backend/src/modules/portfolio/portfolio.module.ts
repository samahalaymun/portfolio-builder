import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from '../upload/upload.module';
import { TemplatesModule } from '../templates/templates.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    TemplatesModule,
    UploadModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, PrismaService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
