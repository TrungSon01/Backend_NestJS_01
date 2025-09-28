import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { updateAvatar, UpdateUserDto } from './dto/update-user.dto';
import cloudinary from 'src/modules/module-system/cloudinary/init.cloudinary';
import { PrismaService } from 'src/modules/module-system/prisma/prisma.service';
import { detail_hinh_anhDTO, hinh_anhDTO } from './dto/hinh_anh.dto';
import { uploadDTO } from './dto/upload.dto';
import { commentDTO, Get_commentDTO } from './dto/comment.dto';
import { PrismaClient } from 'generated/prisma';
import type { Request } from 'express';
import path from 'path';
import * as fs from 'fs';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async checkExist(model: keyof PrismaClient, where: object) {
    const delegate = this.prisma[model] as any;

    const anyExits = await delegate.findUnique({
      where,
    });
    if (!anyExits) return false;
    return anyExits;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getImage(dto: hinh_anhDTO) {
    const { page, pageSize, mo_ta } = dto;
    if (mo_ta) {
      return await this.prisma.hinh_anh.findMany({
        where: {
          mo_ta: { contains: mo_ta },
        },
      });
    }
    if (!page || !pageSize)
      throw new BadRequestException('page or pageSize not found');
    const skip = ((page ?? 1) - 1) * (pageSize ?? 10);
    const take = pageSize;

    const data = await this.prisma.hinh_anh.findMany({
      take,
      skip,
      orderBy: {
        hinh_id: 'asc',
      },
    });
    return { page, pageSize, data };
  }

  findAll() {
    return `This action returns all user`;
  }

  async getDetailImage(hinh_id: number) {
    const detail_image = await this.prisma.hinh_anh.findUnique({
      where: { hinh_id },
    });

    if (!detail_image) {
      throw new Error(`Image with id ${hinh_id} not found`);
    }

    let userPostImage: any;

    if (detail_image.nguoi_dung_id !== null) {
      userPostImage = await this.prisma.nguoi_dung.findUnique({
        where: {
          nguoi_dung_id: detail_image.nguoi_dung_id, // chắc chắn number
        },
      });
    }
    delete userPostImage.mat_khau;
    return {
      ...detail_image,
      user: userPostImage,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async uploadCloud(file: Express.Multer.File, upload: uploadDTO) {
    console.log('uploadCloud', file);

    const byteArrayBuffer = file.buffer;
    const userExist = await this.prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: upload.nguoi_dung_id,
      },
    });
    if (!userExist) throw new BadRequestException('user is not exist');
    // Upload lên Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'images' }, (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        })
        .end(byteArrayBuffer);
    });
    console.log(uploadResult);
    const upload_image = await this.prisma.hinh_anh.create({
      data: {
        duong_dan: uploadResult.public_id,
        mo_ta: upload.mo_ta,
        ten_hinh: upload.ten_hinh,
        nguoi_dung_id: upload.nguoi_dung_id,
      },
    });

    return upload_image;
  }

  async userCheckSaveImage(nguoi_dung_id: number, hinh_id: number) {
    const [userExist, imageExist, checkSaveImage] = await Promise.all([
      this.checkExist('nguoi_dung', { nguoi_dung_id: nguoi_dung_id }),
      this.checkExist('hinh_anh', { hinh_id: hinh_id }),
      this.checkExist('luu_anh', {
        nguoi_dung_id_hinh_id: {
          nguoi_dung_id: nguoi_dung_id,
          hinh_id: hinh_id,
        },
      }),
    ]);
    if (!userExist) throw new NotFoundException('user not in database');
    if (!imageExist) throw new NotFoundException('image not in database');

    if (!checkSaveImage) return false;
    return true;
  }
  async comment(comment: commentDTO) {
    const [userExist, imageExist] = await Promise.all([
      this.checkExist('nguoi_dung', { nguoi_dung_id: comment.nguoi_dung_id }),
      this.checkExist('hinh_anh', { hinh_id: comment.hinh_id }),
    ]);

    if (!imageExist || !userExist)
      throw new NotFoundException('image or user not in dtb, cannot comment');

    const userComment = await this.prisma.binh_luan.create({
      data: {
        noi_dung: comment.noi_dung,
        hinh_id: comment.hinh_id,
        nguoi_dung_id: comment.nguoi_dung_id,
        ngay_binh_luan: new Date(),
      },
    });

    return userComment;
  }

  async uploadAvatar(file: Express.Multer.File, req: any) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    const { nguoi_dung_id } = req.user || '';
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }

    const user = await this.checkExist('nguoi_dung', {
      nguoi_dung_id: nguoi_dung_id,
    });

    console.log({ userr: user });
    if (user.anh_dai_dien && user.anh_dai_dien !== file.filename) {
      const oldPath = path.join(
        process.cwd(),
        'public/images',
        user.anh_dai_dien,
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    await this.prisma.nguoi_dung.update({
      where: { nguoi_dung_id: nguoi_dung_id },
      data: { anh_dai_dien: file.filename },
    });

    return { message: 'File uploaded successfully', filePath: file.path };
  }

  async GetComment(comment: Get_commentDTO) {
    console.log(+comment.hinh_id);
    const isImageExist = await this.prisma.hinh_anh.findUnique({
      where: {
        hinh_id: +comment.hinh_id,
      },
    });
    if (!isImageExist) {
      throw new NotFoundException('image not found');
    }
    const listComment = await this.prisma.binh_luan.findMany({
      where: {
        hinh_id: +comment.hinh_id,
      },
    });
    return listComment;
  }
}
