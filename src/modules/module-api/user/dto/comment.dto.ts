import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class commentDTO {
  @IsNotEmpty()
  @IsString()
  noi_dung: string;

  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  nguoi_dung_id: number;

  @IsNumber()
  @Min(1)
  hinh_id: number;
}

export class Get_commentDTO {
  @IsNumber()
  @Min(1)
  hinh_id: number;
}
