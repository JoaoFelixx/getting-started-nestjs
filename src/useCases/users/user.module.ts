import { Users } from '../../entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
