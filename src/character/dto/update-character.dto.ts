import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @IsBoolean()
  @IsNotEmpty()
  employee: boolean;

  property: Location;
}
