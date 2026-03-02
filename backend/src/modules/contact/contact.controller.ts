import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactResponseDto, CreateContactDto, UpdateContactStatusDto } from './dto/contact.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * Public endpoint: Submit contact form
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a contact form (Public)' })
  @ApiResponse({
    status: 201,
    description: 'Contact form submitted successfully',
    type: ContactResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async create(@Body() createContactDto: CreateContactDto) {
    const contact = await this.contactService.create(createContactDto);
    return {
      message:
        'Thank you for your message! We will get back to you within 24 hours.',
      data: contact,
    };
  }

  /**
   * Admin endpoint: Get all contact submissions
   */
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact submissions (Admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['PENDING', 'READ', 'REPLIED', 'ARCHIVED'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of contact submissions',
    type: [ContactResponseDto],
  })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: 'PENDING' | 'READ' | 'REPLIED' | 'ARCHIVED',
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;

    return this.contactService.findAll(pageNum, limitNum, status as any);
  }

  /**
   * Admin endpoint: Get contact statistics
   */
  @Get('stats')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get contact statistics (Admin only)' })
  @ApiResponse({ status: 200, description: 'Contact statistics' })
  async getStats() {
    return this.contactService.getStats();
  }

  /**
   * Admin endpoint: Get a single contact by ID
   */
  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single contact by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Contact details',
    type: ContactResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  /**
   * Admin endpoint: Update contact status
   */
  @Patch(':id/status')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update contact status (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Contact status updated',
    type: ContactResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateContactStatusDto: UpdateContactStatusDto,
  ) {
    return this.contactService.updateStatus(id, updateContactStatusDto);
  }

  /**
   * Admin endpoint: Delete a contact
   */
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a contact (Admin only)' })
  @ApiResponse({ status: 200, description: 'Contact deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async remove(@Param('id') id: string) {
    await this.contactService.remove(id);
    return { message: 'Contact deleted successfully' };
  }
}
