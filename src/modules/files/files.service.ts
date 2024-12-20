import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import * as fs from 'node:fs';
import { createReadStream } from 'node:fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  findAll() {
    return this.fileRepository.find();
  }

  async findOne(uuid: string) {
    const { path } = (await this.fileRepository.findOneBy({ uuid })) ?? {};

    if (!path) {
      throw new BadRequestException('file not found');
    }
    const file = createReadStream(path);

    return new StreamableFile(file);
  }

  update(uuid: string, updateFileDto: UpdateFileDto) {
    return this.fileRepository.update(uuid, updateFileDto);
  }

  async remove(uuid: string) {
    const file = await this.fileRepository.findOneBy({ uuid });
    if (!file) {
      return;
    }
    await this.fileRepository.delete(uuid);
    try {
      await fs.promises.unlink(file.path);
    } catch (error) {
      console.error('Error removing file', error);
    }

    return true;
  }

  upload(file: Express.Multer.File) {
    return this.fileRepository.save(file);
  }
}
