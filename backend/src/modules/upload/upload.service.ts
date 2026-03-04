import { Injectable } from '@nestjs/common';
import cloudinary from 'src/common/cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(
    file: Express.Multer.File,
    folder = 'portfolio',
  ): Promise<{ url?: string; publicId?: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'image',
            transformation: [
              { width: 800, height: 800, crop: 'limit' },
              { quality: 'auto' },
            ],
          },
          (error, result) => {
            if (error) return reject(error);

            resolve({
              url: result?.secure_url,
              publicId: result?.public_id,
            });
          },
        )
        .end(file.buffer);
    });
  }

  async deleteImage(publicId?: string) {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  }
}
