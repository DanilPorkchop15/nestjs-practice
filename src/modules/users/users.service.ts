import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(uuid: string) {
    return this.userRepository.findOneBy({ uuid });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(uuid, updateUserDto);
  }

  remove(uuid: string) {
    return this.userRepository.delete(uuid);
  }
}
