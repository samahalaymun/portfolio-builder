// src/templates/templates.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  /**
   * GET /templates
   * Get all active templates (public endpoint)
   */
  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  /**
   * GET /templates/free
   * Get free templates only
   */
  @Get('free')
  findFree() {
    return this.templatesService.findFreeTemplates();
  }

  /**
   * GET /templates/premium
   * Get premium templates (requires auth)
   */
  @UseGuards(JwtGuard)
  @Get('premium')
  findPremium() {
    return this.templatesService.findPremiumTemplates();
  }

  /**
   * GET /templates/:id
   * Get single template by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }
}
