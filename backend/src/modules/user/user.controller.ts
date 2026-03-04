import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@CurrentUser() user: { sub: string }) {
    const dbUser = await this.userService.findById(user.sub);
    return {
      id: dbUser?.id,
      email: dbUser?.email,
      name: dbUser?.name,
    };
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  updateProfile(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.update(user.sub, dto);
  }

  @Patch('me/password')
  @UseGuards(JwtGuard)
  changePassword(
    @CurrentUser() user: { sub: string },
    @Body() dto: ChangePasswordDto,
  ) {
    console.log(user.sub);

    return this.userService.changePassword(user.sub, dto);
  }
}
