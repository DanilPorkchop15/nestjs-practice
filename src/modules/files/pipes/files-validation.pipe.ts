import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AllowedMimeTypes } from '../types/files.types';

@Injectable()
export class FilesValidationPipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  private readonly allowedMimeTypes = Object.values(AllowedMimeTypes);

  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException('No file was uploaded');
    }

    if (!this.allowedMimeTypes.includes(value.mimetype as AllowedMimeTypes)) {
      throw new BadRequestException(
        `Invalid file type. Only ${this.allowedMimeTypes.join(', ')} are allowed`,
      );
    }

    if (value.size > 5 * 1024 * 1024) {
      throw new BadRequestException(
        'File is too large. Maximum allowed size is 5MB',
      );
    }

    return value;
  }
}
