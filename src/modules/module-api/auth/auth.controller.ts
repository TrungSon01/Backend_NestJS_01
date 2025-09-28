import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport sẽ tự redirect sang Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req: any, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.googleLogin(req);
    return res.redirect(
      `http://localhost:5173?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    // Passport sẽ tự redirect sang Facebook
  }

  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Request() req: any, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.facebookLogin(req);
    return res.redirect(
      `http://localhost:5173?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @Public()
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // Passport sẽ tự redirect sang Github
  }

  @Public()
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Request() req: any, @Res() res: Response) {
    await this.authService.githubLogin(req);
    return res.redirect(`http://localhost:5173`);
  }

  @Public()
  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }
  @Public()
  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
