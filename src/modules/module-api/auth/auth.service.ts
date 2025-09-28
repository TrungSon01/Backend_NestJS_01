import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules/module-system/prisma/prisma.service';
import { TokensService } from 'src/modules/module-system/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokensService,
  ) {}

  async register(RegisterDto: RegisterDto) {
    const { email, mat_khau, ho_ten } = RegisterDto;
    if (!email || !mat_khau || !ho_ten) {
      throw new BadRequestException('Vui lòng cung cấp đầy đủ thông tin');
    }
    const existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { email: RegisterDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Tạo salt (muối) để tăng độ bảo mật
    const salt = await bcrypt.genSalt(10);

    // Hash mật khẩu người dùng nhập
    const hashedPassword = await bcrypt.hash(RegisterDto.mat_khau, salt);

    await this.prisma.nguoi_dung.create({
      data: {
        ho_ten: RegisterDto.ho_ten,
        email: RegisterDto.email,
        mat_khau: hashedPassword,
      },
    });

    return 'Tài khoản đã được tạo thành công';
  }
  async googleLogin(req: any) {
    const { id, displayName, emails, photos } = req.user.profile;

    let userExist = await this.prisma.nguoi_dung.findFirst({
      where: {
        OR: [{ email: emails?.[0]?.value }, { googleId: id }],
      },
    });

    if (!userExist) {
      userExist = await this.prisma.nguoi_dung.create({
        data: {
          googleId: id,
          ho_ten: displayName,
          email: emails?.[0]?.value,
          anh_dai_dien: photos?.[0]?.value,
        },
      });
    }
    const tokens = this.tokenService.createTokens(userExist.nguoi_dung_id);
    console.log(tokens);
    return tokens;
  }

  async facebookLogin(req: any) {
    console.log(req.user);
    const userExist = await this.prisma.nguoi_dung.findFirst({
      where: {
        facebookId: req.user.providerId,
      },
    });

    if (!userExist) {
      await this.prisma.nguoi_dung.create({
        data: {
          email: `${req.user.providerId}@gmail.com`,
          facebookId: req.user.providerId,
          ho_ten: req.user.firstName,
          anh_dai_dien: req.user.avatar,
        },
      });
    }
    const tokens = this.tokenService.createTokens(userExist?.nguoi_dung_id);

    console.log(tokens);
    return tokens;
  }

  githubLogin(req: any) {
    return true;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async login(loginDto: LoginDto) {
    const { email, mat_khau } = loginDto;
    const userExist = await this.prisma.nguoi_dung.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExist) {
      throw new BadRequestException('user is not exist');
    }
    const isPassword = bcrypt.compareSync(mat_khau, userExist.mat_khau || '');
    if (!isPassword) throw new BadRequestException('wrong password');

    const tokens = this.tokenService.createTokens(userExist.nguoi_dung_id);
    // console.log({ email, password });
    // sendMail('ngtrungson282004@gmail.com');
    return tokens;
  }
}
