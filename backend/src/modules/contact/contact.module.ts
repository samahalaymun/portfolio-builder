import { Module } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
    ],
  controllers: [ContactController],
  providers: [ContactService, PrismaService],
  exports: [ContactService],
})
export class ContactModule {}
