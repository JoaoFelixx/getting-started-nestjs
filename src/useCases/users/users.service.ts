import { Users } from '../../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    return await this.usersRepository.findOne({ where: { _id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
