import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PrismaService } from 'prisma/prisma.service';
import slugify from 'slugify';
import { UpdatePortfolioDto } from './dto/update-protfolio.dto';
import { UploadService } from '../upload/upload.service';
import { normalizeContent } from 'src/utils';
import { TemplatesService } from '../templates/templates.service';
import { UpdatePortfolioTemplateDto } from './dto/update-portfolio-template.dto';

@Injectable()
export class PortfolioService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
    private readonly templatesService: TemplatesService,
  ) {}

  async create(userId: string, dto: CreatePortfolioDto) {
    // Generate unique slug from title
    const baseSlug = this.generateSlug(dto.title);
    const slug = await this.ensureUniqueSlug(baseSlug);
    return this.prisma.portfolio.create({
      data: {
        title: dto.title,
        slug,
        content: dto.content || {},
        theme: 'default',
        themeConfig: {},
        userId,
        templateId: 'default',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
          },
        },
        template: true,
      },
    });
  }

  async update(userId: string, dto: UpdatePortfolioDto) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    // Update slug if title changed
    let slug = portfolio.slug;
    if (dto.title && dto.title !== portfolio.title) {
      const baseSlug = this.generateSlug(dto.title);
      slug = await this.ensureUniqueSlug(baseSlug, portfolio.id);
    }

    return this.prisma.portfolio.update({
      where: { userId },
      data: {
        ...dto,
        slug,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
          },
        },
        template: true,
      },
    });
  }
  async togglePublish(userId: string, isPublished: boolean) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.update({
      where: { userId },
      data: {
        isPublished,
        isPublic: isPublished, // Keep isPublic in sync
        publishedAt: isPublished ? new Date() : null,
        status: isPublished ? 'PUBLISHED' : 'DRAFT',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
          },
        },
        template: true,
      },
    });
  }
  async findMyPortfolio(userId: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
            role:true
          },
        },
        template: true,
      }, // ✅ Include template
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }
  findPortfolios() {
    return this.prisma.portfolio.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
          },
        },
        template: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findBySlug(slug: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            username: true,
          },
        },
        template: true,
      },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    // Only show published portfolios or throw 404
    if (!portfolio.isPublished && !portfolio.isPublic) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        portfolio: {
          include: {
            template: true,
          },
        },
      },
    });
    
    if (!user || !user.portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    // Only show published portfolios
    if (!user.portfolio.isPublished) {
      
      throw new NotFoundException('Portfolio not found');
    }

    return {
      ...user.portfolio,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
    };
  }
  async updateAvatar(
    userId: string,
    avatar: { url: string; publicId: string },
  ) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
    });
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const content = normalizeContent(portfolio.content);
    const oldPublicId = content?.avatar?.publicId;

    //delete old image
    if (oldPublicId) {
      await this.uploadService.deleteImage(oldPublicId);
    }

    return this.prisma.portfolio.update({
      where: { userId },
      data: {
        content: {
          ...content,
          avatar,
        },
      },
    });
  }

  async removeAvatar(userId: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
    });

    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const content = normalizeContent(portfolio.content);

    const publicId = content.avatar?.publicId;

    if (publicId) {
      await this.uploadService.deleteImage(publicId);
    }

    const { avatar, ...restContent } = content;

    return this.prisma.portfolio.update({
      where: { userId },
      data: {
        content: restContent,
      },
    });
  }

  /**
   * ✅ NEW: Update portfolio template
   */
  async updateTemplate(userId: string, dto: UpdatePortfolioTemplateDto) {
    // 1. Verify template exists and is active
    const templateExists = await this.templatesService.exists(dto.templateId);
    if (!templateExists) {
      throw new NotFoundException(`Template "${dto.templateId}" not found`);
    }

    // 2. Find user's portfolio
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    // 3. Update template
    const updated = await this.prisma.portfolio.update({
      where: { userId },
      data: { templateId: dto.templateId },
      include: { template: true }, // ✅ Include template in response
    });

    return updated;
  }
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove duplicate hyphens
      .trim();
  }
  private async ensureUniqueSlug(
    baseSlug: string,
    excludeId?: string,
  ): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.prisma.portfolio.findUnique({
        where: { slug },
      });

      if (!existing || existing.id === excludeId) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
}
