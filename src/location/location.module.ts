import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './entities/location.entity';
import { Character } from '../character/entities/character.entity';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { ApitokenModule } from '../apitoken/apitoken.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Character]), ApitokenModule],
  controllers: [LocationController],
  providers: [LocationService, ApiKeyGuard],
})
export class LocationModule {}
