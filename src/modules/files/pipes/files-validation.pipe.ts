import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

enum ALLOWED_MIME_TYPES {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  PDF = 'application/pdf',
  ZIP = 'application/zip',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

@Injectable()
export class FilesValidationPipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException('no file uploaded');
    }
    if (
      !Object.values(ALLOWED_MIME_TYPES).includes(
        value.mimetype as ALLOWED_MIME_TYPES,
      )
    ) {
      throw new BadRequestException('Invalid file type');
    }

    if (value.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File is too large');
    }

    return value;
  }
}
