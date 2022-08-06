import 'dotenv/config';
import { Users } from './entities';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
