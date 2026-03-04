import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('feedback')
@UseGuards(JwtGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  // POST /feedback
  @UseGuards(JwtGuard)
  @Post()
  async submit(@CurrentUser() user, @Body() dto: CreateFeedbackDto) {
    const result = await this.feedbackService.submitFeedback(user.sub, dto);
    return { message: 'Thank you for your feedback!', id: result.id };
  }

  // GET /feedback/my
  @UseGuards(JwtGuard)
  @Get('my')
  mine(@CurrentUser() user) {
    return this.feedbackService.getUserFeedback(user.sub);
  }
  // GET /feedbacks
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  getFeedbacks(@CurrentUser() user) {
    return this.feedbackService.getAllFeedbacks();
  }
}
