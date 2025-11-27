import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApitokenService } from './apitoken.service';
import { CreateApitokenDto } from './dto/create-apitoken.dto';

@Controller('apitoken')
export class ApitokenController {
  constructor(private readonly apitokenService: ApitokenService) {}

  @Post()
  create(@Body() createApitokenDto: CreateApitokenDto) {
    return this.apitokenService.create(createApitokenDto);
  }

  @Get()
  findOne(@Query('token') token: string) {
    return this.apitokenService.findOneByToken(token);
  }

  @Patch(':id/reduceReqLeft')
  reduceReqLeft(@Param('id') id: string) {
    return this.apitokenService.reduceReqLeft(id);
  }
}
