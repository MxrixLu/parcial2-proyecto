import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Character } from '../character/entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const owner = await this.characterRepository.findOne({
      where: { id: createLocationDto.owner.id },
    });
    if (!owner) {
      throw new BadRequestException('Owner not found');
    }
    if (owner.property) {
      throw new BadRequestException('Owner already has a property');
    }
    const location = this.locationRepository.create({
      ...createLocationDto,
      favCharacters: [],
    });
    await this.locationRepository.save(location);
    return location;
  }

  async findAll() {
    return await this.locationRepository.find();
  }
}
