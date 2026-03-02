import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  //upload image → url + publicId
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file, 'portfolio/photos');
  }

  //delete image 
  @Delete('image')
  deleteImage(@Body('publicId') publicId: string) {
    return this.uploadService.deleteImage(publicId);
  }
}
