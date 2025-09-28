import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class updateAvatar {
  @IsOptional()
  @IsString()
  ho_ten: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(150)
  tuoi: number;

  @IsOptional()
  @IsString()
  avartar: string;
}
