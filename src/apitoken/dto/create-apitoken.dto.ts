import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateApitokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  reqLeft: number;
}
