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
    const character = this.characterRepository.create({
      ...createCharacterDto,
      property: undefined,
      favPlaces: [],
    });
    await this.characterRepository.save(character);
    return character;
  }

  async addFavorite(characterId: number, locationId: number) {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
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
    if (character.favPlaces.includes(location)) {
      throw new BadRequestException('Location already in favorites');
    }
    character.favPlaces.push(location);
    await this.characterRepository.save(character);
    return character;
  }
  //El personaje debe existir y si no tiene propiedad el servicio debe retornar {taxDebt:0} COEF = SI ES EMPLEADO 0.08 SI NO 0.03
  //COSTO_LOCATION * (1 + COEF.)
  async getTaxes(characterId: number) {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
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
