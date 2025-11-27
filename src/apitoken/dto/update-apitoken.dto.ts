import { PartialType } from '@nestjs/mapped-types';
import { CreateApitokenDto } from './create-apitoken.dto';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateApitokenDto extends PartialType(CreateApitokenDto) {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
