import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../location/entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    await this.characterRepository.save(character);
    return character;
  }

  async addFavorite(characterId: number, locationId: number) {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['favPlaces'],
    });
    if (!character) {
      throw new BadRequestException('Character not found');
    }
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });
    if (!location) {
      throw new BadRequestException('Location not found');
    }
    if (!character.favPlaces) {
      character.favPlaces = [];
    }
    const alreadyFavorite = character.favPlaces.some(
      (fav) => fav.id === location.id,
    );
    if (alreadyFavorite) {
      throw new BadRequestException('Location already in favorites');
    }
    character.favPlaces.push(location);
    await this.characterRepository.save(character);
    return character;
  }
  async getTaxes(characterId: number) {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['property'],
    });
    if (!character) {
      throw new BadRequestException('Character not found');
    }
    if (!character.property) {
      return { taxDebt: 0 };
    }
    const isEmployee = character.employee;
    if (isEmployee) {
      return { taxDebt: character.property.cost * 0.08 };
    }
    return { taxDebt: character.property.cost * 0.03 };
  }
}
