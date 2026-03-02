// src/templates/templates.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all active templates
   */
  async findAll() {
    return this.prisma.template.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Get single template by ID
   */
  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template || !template.isActive) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }

    return template;
  }

  /**
   * Get free templates only
   */
  async findFreeTemplates() {
    return this.prisma.template.findMany({
      where: {
        isPremium: false,
        isActive: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Get premium templates
   */
  async findPremiumTemplates() {
    return this.prisma.template.findMany({
      where: {
        isPremium: true,
        isActive: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Check if template exists and is active
   */
  async exists(id: string): Promise<boolean> {
    const template = await this.prisma.template.findUnique({
      where: { id },
      select: { isActive: true },
    });

    return !!template && template.isActive;
  }
}
