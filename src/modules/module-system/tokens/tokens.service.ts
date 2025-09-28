import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';
@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService) {}
  createTokens(nguoi_dung_id: any) {
    const accessToken = this.jwt.sign(
      { nguoi_dung_id },
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN, secret: ACCESS_TOKEN_SECRET },
    );
    const refreshToken = this.jwt.sign(
      { nguoi_dung_id },
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN, secret: REFRESH_TOKEN_SECRET },
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  verifyAccessToken(accessToken: any) {
    const decodeAccessToken = this.jwt.verify(accessToken, {
      secret: ACCESS_TOKEN_SECRET,
    });
    return decodeAccessToken;
  }
  verifyRefreshToken(refreshToken: any) {
    const decodeRefreshToken = this.jwt.verify(refreshToken, {
      secret: REFRESH_TOKEN_SECRET,
    });
    return decodeRefreshToken;
  }
}
