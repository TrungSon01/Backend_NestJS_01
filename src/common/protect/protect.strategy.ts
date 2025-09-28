import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { nguoi_dung } from 'generated/prisma';
import { PrismaService } from 'src/modules/module-system/prisma/prisma.service';
// import { jwtConstants } from './constants';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // ko bỏ qua thời gian hết hạn => hết hạn thì ko dùng đc
      secretOrKey: ACCESS_TOKEN_SECRET || '',
    });
  }

  async validate({
    nguoi_dung_id,
  }: {
    nguoi_dung_id: nguoi_dung['nguoi_dung_id'];
  }) {
    console.log('validate - ProtectStrategy');
    const user = await this.prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    if (!user) {
      return false; // tra ve user o handleRequest ;
    }
    return user;
  }
}
