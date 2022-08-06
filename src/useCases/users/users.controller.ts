import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities';

@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('users')
  public async index(): Promise<User[]> {
    return await this.appService.findAll();
  }
}
