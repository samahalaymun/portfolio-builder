import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { AiModule } from './modules/ai/ai.module';
import { UploadModule } from './modules/upload/upload.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './modules/templates/templates.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    PortfolioModule,
    AiModule,
    UploadModule,
    ContactModule,
    TemplatesModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes env vars available everywhere
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
