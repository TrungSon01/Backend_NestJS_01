import { IsNumber, IsString } from 'class-validator';

export class uploadDTO {
  @IsString()
  ten_hinh: string;
  @IsString()
  mo_ta: string;

  @IsNumber()
  nguoi_dung_id: number;
}
