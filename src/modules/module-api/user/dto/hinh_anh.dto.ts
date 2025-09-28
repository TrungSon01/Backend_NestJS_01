import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class hinh_anhDTO {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsString()
  mo_ta?: string;
}

export class detail_hinh_anhDTO {
  @IsNumberString()
  hinh_id: string;
}
