import 'dotenv/config';
import { Users } from './entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHttpModule } from './useCases';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.URL_FOR_TESTING,
      entities: [Users],
      synchronize: true,
      logging: false,
      subscribers: [],
      migrations: [],
    }),
    UserHttpModule,
  ],
})
export class AppModule {}
