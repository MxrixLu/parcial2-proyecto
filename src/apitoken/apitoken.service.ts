import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApitokenDto } from './dto/create-apitoken.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Apitoken } from './entities/apitoken.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApitokenService {
  constructor(
    @InjectRepository(Apitoken)
    private readonly apitokenRepository: Repository<Apitoken>,
  ) {}

  async create(createApitokenDto: CreateApitokenDto) {
    try {
      const apitoken = this.apitokenRepository.create(createApitokenDto);
      await this.apitokenRepository.save(apitoken);
      return {
        id: apitoken.id,
        token: apitoken.token,
        active: apitoken.active,
        reqLeft: apitoken.reqLeft,
      };
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === '23505') {
        throw new BadRequestException('Token already exists');
      }
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.apitokenRepository.findOneBy({ id });
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === '23505') {
        throw new BadRequestException('Token not found');
      }
      throw error;
    }
  }

  async findOneByToken(token: string) {
    try {
      return await this.apitokenRepository.findOneBy({ token });
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === '23505') {
        throw new BadRequestException('Token not found');
      }
      throw error;
    }
  }

  // reduce reqLeft Token
  async reduceReqLeft(id: string): Promise<void> {
    try {
      const apitoken = await this.findOne(id);
      if (!apitoken) {
        throw new BadRequestException('Token not found');
      }
      apitoken.reqLeft--;
      await this.apitokenRepository.save(apitoken);
      return;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === '23505') {
        throw new BadRequestException('Token not found');
      }
      throw error;
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const apitoken = await this.findOneByToken(apiKey);
    if (!apitoken) {
      throw new BadRequestException('Token not found');
    }
    return apitoken.active && apitoken.reqLeft > 0;
  }
}
