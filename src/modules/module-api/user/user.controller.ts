import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { detail_hinh_anhDTO, hinh_anhDTO } from './dto/hinh_anh.dto';
import { uploadDTO } from './dto/upload.dto';
import { commentDTO, Get_commentDTO } from './dto/comment.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { updateAvatar, UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';
import { multerDiskConfig } from 'src/common/avatarLocal/local.multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('uploadCloud')
  @UseInterceptors(FileInterceptor('image'))
  uploadCloud(
    @UploadedFile() file: Express.Multer.File,
    @Body() upload: uploadDTO,
  ) {
    return this.userService.uploadCloud(file, upload);
  }

  @Public()
  @Get('getImage')
  getImage(@Body() hinh_anh: hinh_anhDTO) {
    return this.userService.getImage(hinh_anh);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('getDetailImage')
  getDetailImage(@Query('hinh_id') hinh_id: string) {
    return this.userService.getDetailImage(+hinh_id);
  }

  @Get('isSaveImage')
  userCheckSaveImage(
    @Query('nguoi_dung_id') id1: string,
    @Query('hinh_id') id2: string,
  ) {
    return this.userService.userCheckSaveImage(+id1, +id2);
  }

  @Post('comment')
  comment(@Body() comment: commentDTO) {
    return this.userService.comment(comment);
  }

  @Get('comment')
  GetComment(@Query() comment: Get_commentDTO) {
    return this.userService.GetComment(comment);
  }
  @Patch('uploadAvatar')
  @UseInterceptors(FileInterceptor('avatar', multerDiskConfig))
  uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.userService.uploadAvatar(avatar, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
