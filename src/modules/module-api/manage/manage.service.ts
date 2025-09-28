import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import {
  ChangeInforUser,
  Delete_ImageDTO,
  Manage_Get_Image_By_Id_UserDTO,
  Manage_Get_Image_Was_Save_By_Id_UserDTO,
  Manage_UserDTO,
} from './dto/mange.dto';
import { PrismaService } from 'src/modules/module-system/prisma/prisma.service';
import cloudinary from 'src/modules/module-system/cloudinary/init.cloudinary';
import { URL_IMAGE_IN_CLOUD } from 'src/common/constant/app.constant';

@Injectable()
export class ManageService {
  constructor(private readonly prisma: PrismaService) {}
  async getDetailInforUser(manage: Manage_UserDTO) {
    const id = manage.nguoi_dung_id;
    // const userExist = await this.prisma.nguoi_dung.findUnique({
    //   where: {
    //     nguoi_dung_id: manage.nguoi_dung_id,
    //   },
    // });
    // if (!userExist) {
    //   throw new NotFoundException('this user not in database');
    // }
    const userExist = await this.findOne(
      this.prisma.nguoi_dung,
      'nguoi_dung_id',
      id,
    );
    delete (userExist as any).mat_khau;
    return userExist;
  }

  async getListImageByUserId(manage: Manage_Get_Image_By_Id_UserDTO) {
    const { nguoi_dung_id } = manage;
    const getListImageByUserId = await this.prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    return { data: getListImageByUserId };
  }

  async getListImageWasSaveByUserId(
    manage: Manage_Get_Image_Was_Save_By_Id_UserDTO,
  ) {
    const { nguoi_dung_id } = manage;
    await this.findOne(this.prisma.nguoi_dung, 'nguoi_dung_id', nguoi_dung_id);
    const ListImageWasSave = await this.prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
      include: {
        hinh_anh: true,
      },
    });
    const dataReturn = ListImageWasSave.map((item) => ({
      ngay_luu: item.ngay_luu,
      hinh_anh: item.hinh_anh,
    }));
    return dataReturn;
  }
  create(createManageDto: CreateManageDto) {
    return 'This action adds a new manage';
  }
  async deleteImageById(req: any, manage: Delete_ImageDTO) {
    const hinh_id = manage.hinh_id;
    const nguoi_dung_id = req.user.nguoi_dung_id;

    const imageExist = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: hinh_id,
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    if (!imageExist) {
      throw new ForbiddenException(
        'ko phải người đăng ảnh hoặc ảnh đã ko còn tồn tại',
      );
    }

    await this.prisma.hinh_anh.delete({
      where: {
        hinh_id: hinh_id,
      },
    });

    // delete trên cloud
    cloudinary.uploader.destroy(imageExist.duong_dan);
    return 'Success';
  }
  findAll() {
    return `This action returns all manage`;
  }

  async findOne(table: any, col: string, value: any) {
    const result = await table.findFirst({
      where: {
        [col]: value,
      },
    });

    if (!result) {
      throw new NotFoundException(`${col} = ${value} không tồn tại`);
    }

    return result;
  }

  async changeInforUser(req: any, manage: ChangeInforUser) {
    const nguoi_dung_id = req.user.nguoi_dung_id;
    console.log(nguoi_dung_id, { manage });
    const { ho_ten, tuoi } = manage;
    await this.prisma.nguoi_dung.updateMany({
      data: {
        ho_ten: ho_ten,
        tuoi: tuoi,
      },
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    return 'OKK';
  }

  update(id: number, updateManageDto: UpdateManageDto) {
    return `This action updates a #${id} manage`;
  }

  remove(id: number) {
    return `This action removes a #${id} manage`;
  }
}
