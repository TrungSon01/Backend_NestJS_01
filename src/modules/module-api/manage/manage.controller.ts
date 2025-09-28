import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  Put,
} from '@nestjs/common';
import { ManageService } from './manage.service';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import {
  ChangeInforUser,
  Delete_ImageDTO,
  Manage_Get_Image_By_Id_UserDTO,
  Manage_Get_Image_Was_Save_By_Id_UserDTO,
  Manage_UserDTO,
} from './dto/mange.dto';
import { Public } from 'src/common/decorator/public.decorator';
@Public()
@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}

  @Post()
  create(@Body() createManageDto: CreateManageDto) {
    return this.manageService.create(createManageDto);
  }

  @Get()
  findAll() {
    return this.manageService.findAll();
  }

  @Public()
  @Get('getDetailInforUser')
  getDetailInforUser(@Query() manage: Manage_UserDTO) {
    return this.manageService.getDetailInforUser(manage);
  }

  @Public()
  @Get('getListImageByUserId')
  getListImageByUserId(@Query() manage: Manage_Get_Image_By_Id_UserDTO) {
    return this.manageService.getListImageByUserId(manage);
  }

  @Public()
  @Get('getListImageWasSaveByUserId')
  getListImageWasSaveByUserId(
    @Query() manage: Manage_Get_Image_Was_Save_By_Id_UserDTO,
  ) {
    return this.manageService.getListImageWasSaveByUserId(manage);
  }

  @Delete('deleteImageById')
  DeleteImageById(@Request() req, @Query() manage: Delete_ImageDTO) {
    return this.manageService.deleteImageById(req, manage);
  }

  @Put('changeInforUser')
  changeInforUser(@Request() req, @Body() manage: ChangeInforUser) {
    return this.manageService.changeInforUser(req, manage);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageDto: UpdateManageDto) {
    return this.manageService.update(+id, updateManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageService.remove(+id);
  }
}
