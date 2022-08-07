import { Users, User } from '../../entities';
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
    return await this.usersRepository.findOneBy({ _id: id });
  }

  async remove(id: string): Promise<void | Error> {
    const result = await this.usersRepository.findOneBy({ _id: id });

    if (!result) {
      return new Error('User does not registered');
    }

    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<Users> {
    const createdUser = this.usersRepository.create(user);

    const result = await this.usersRepository.save(createdUser);

    return result;
  }

  async update(user: User): Promise<Users | Error> {
    try {
      const userExits = await this.usersRepository.findOneBy({ _id: user._id });

      if (!userExits) {
        return new Error('User does not exists');
      }

      Object.assign(userExits, user);

      const updateUser = await this.usersRepository.create(userExits);

      await this.usersRepository.save(updateUser);

      return updateUser;
    } catch (error) {
      return new Error('Error updating user');
    }
  }
}
