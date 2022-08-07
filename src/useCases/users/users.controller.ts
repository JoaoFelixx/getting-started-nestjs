import { User } from '../../entities';
import { Response } from 'express';
import { UsersService } from './users.service';
import { randomUUID as uuid } from 'crypto';
import {
  Get,
  Res,
  Put,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Controller,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  private readonly regexEmail: RegExp;

  constructor(private readonly appService: UsersService) {
    this.regexEmail = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
  }

  @Get()
  @HttpCode(200)
  public async getUsers() {
    return await this.appService.findAll();
  }

  @Get(':id')
  public async getUser(@Param() params, @Res() response: Response) {
    const { id } = params;

    const result = await this.appService.findOne(id);

    if (!result) {
      return response.sendStatus(204);
    }

    response.json(result);
  }

  @Post()
  public async createUser(
    @Body() body: Omit<User, '_id'>,
    @Res() response: Response,
  ) {
    try {
      const user: User = {
        ...body,
        _id: uuid(),
      };

      if (!this.regexEmail.test(user.email)) {
        return response.status(400).json('Email is invalid');
      }

      const result = await this.appService.create(user);

      response.status(201).json(result);
    } catch (error) {
      response.status(400).json('Error creating user');
    }
  }

  @Delete(':id')
  public async deleteUser(@Param() params, @Res() response: Response) {
    try {
      const { id } = params;

      const result = await this.appService.remove(id);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      response.status(204).json('User deleted');
    } catch (error) {
      response.status(400).json('Error deleting user');
    }
  }

  @Put(':id')
  public async updateUser(
    @Param() params,
    @Body() body: User,
    @Res() response: Response,
  ) {
    try {
      const { id } = params;
      const user: User = {
        ...body,
        _id: id,
      };

      const result = await this.appService.update(user);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      response.status(202).json(result);
    } catch (error) {
      return response.status(400).json('Error updating user');
    }
  }
}
