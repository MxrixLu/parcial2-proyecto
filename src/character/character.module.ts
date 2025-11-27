import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character } from './entities/character.entity';
import { Location } from '../location/entities/location.entity';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { ApitokenModule } from '../apitoken/apitoken.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location]), ApitokenModule],
  controllers: [CharacterController],
  providers: [CharacterService, ApiKeyGuard],
})
export class CharacterModule {}
