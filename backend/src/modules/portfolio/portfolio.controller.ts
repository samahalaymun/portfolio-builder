import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdatePortfolioDto } from './dto/update-protfolio.dto';
import { UpdatePortfolioTemplateDto } from './dto/update-portfolio-template.dto';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  // USER: create portfolio
  @UseGuards(JwtGuard)
  @Post()
  create(@CurrentUser() user, @Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(user.sub, dto);
  }

  // USER: my portfolios
  @UseGuards(JwtGuard)
  @Get('me')
  findMine(@CurrentUser() user) {
    return this.portfolioService.findMyPortfolio(user.sub);
  }
  @UseGuards(JwtGuard)
  @Patch() // PATCH /portfolios
  updatePortfolioContent(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(user.sub, dto);
  }
  //// USER: update portfolio theme
  @UseGuards(JwtGuard)
  @Patch('theme')
  updateTheme(
    @CurrentUser() user: { sub: string },
    @Body() dto: Pick<UpdatePortfolioDto, 'theme' | 'themeConfig'>,
  ) {
    return this.portfolioService.update(user.sub, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('avatar')
  updateAvatar(
    @CurrentUser() user: { sub: string },
    @Body() body: { avatar: { url: string; publicId: string } },
  ) {
    return this.portfolioService.updateAvatar(user.sub, body.avatar);
  }

  @UseGuards(JwtGuard)
  @Delete('avatar')
  removeAvatar(@CurrentUser() user: { sub: string }) {
    return this.portfolioService.removeAvatar(user.sub);
  }

  @UseGuards(JwtGuard)
  @Patch('template')
  async updateTemplate(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdatePortfolioTemplateDto,
  ) {
    return this.portfolioService.updateTemplate(user.sub, dto);
  }
  @UseGuards(JwtGuard)
  @Patch('publish')
  togglePublish(
    @CurrentUser() user: { sub: string },
    @Body() body: { isPublished: boolean },
  ) {
    return this.portfolioService.togglePublish(user.sub, body.isPublished);
  }

  // ==================== PUBLIC ROUTES ====================

  // View portfolio by username (portify.com/username)
  @Get('u/:username')
  findByUsername(@Param('username') username: string) {
    return this.portfolioService.findByUsername(username);
  }

  // View portfolio by slug (legacy support)
  @Get('public/:slug')
  findPublic(@Param('slug') slug: string) {
    return this.portfolioService.findBySlug(slug);
  }

  // Get all portfolios (admin only)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.portfolioService.findPortfolios();
  }
}
