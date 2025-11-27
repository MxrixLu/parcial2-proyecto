import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
