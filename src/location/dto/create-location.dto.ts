import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Character } from 'src/character/entities/character.entity';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  owner: Character;
}
