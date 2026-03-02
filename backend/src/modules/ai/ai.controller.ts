// ai.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateSummaryDto } from './dto/generate-summary.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtGuard)
  @Post('summary')
  generateSummary(@Body() dto: GenerateSummaryDto) {
    return this.aiService.generateSummary(dto);
  }

  @UseGuards(JwtGuard)
  @Post('about')
  generateAbout(@Body() dto: GenerateSummaryDto) {
    return this.aiService.generateAbout(dto);
  }

  // ✅ NEW: Project description
  @UseGuards(JwtGuard)
  @Post('project-description')
  generateProjectDescription(
    @Body() dto: { title: string; technologies?: string[]; userText?: string },
  ) {
    return this.aiService.generateProjectDescription(dto);
  }

  // ✅ NEW: Experience description
  @UseGuards(JwtGuard)
  @Post('experience-description')
  generateExperienceDescription(
    @Body() dto: { role: string; company: string; userText?: string },
  ) {
    return this.aiService.generateExperienceDescription(dto);
  }

  // ✅ NEW: Experience description
  @UseGuards(JwtGuard)
  @Post('education-description')
  generateEducationDescription(
    @Body() dto: { institution: string; degree: string;field:string; userText?: string },
  ) {
    return this.aiService.generateEducationDescription(dto);
  }
}
