import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApitokenService } from './apitoken.service';
import { ApitokenController } from './apitoken.controller';
import { Apitoken } from './entities/apitoken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apitoken])],
  controllers: [ApitokenController],
  providers: [ApitokenService],
  exports: [ApitokenService],
})
export class ApitokenModule {}
