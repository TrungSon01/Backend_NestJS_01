import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Manage_UserDTO {
  @IsNumber()
  nguoi_dung_id: number;
}

export class Manage_Get_Image_By_Id_UserDTO {
  @IsNumber()
  @IsNotEmpty()
  nguoi_dung_id: number;
}

export class Manage_Get_Image_Was_Save_By_Id_UserDTO {
  @IsNumber()
  @IsNotEmpty()
  nguoi_dung_id: number;
}

export class Delete_ImageDTO {
  @IsNotEmpty()
  @IsNumber()
  hinh_id: number;
}

export class ChangeInforUser {
  @IsNumber()
  @IsOptional()
  tuoi: number;

  @IsString()
  @IsOptional()
  ho_ten: string;
}
