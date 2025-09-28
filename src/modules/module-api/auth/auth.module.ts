import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { TokensService } from 'src/modules/module-system/tokens/tokens.service';
import { TokensModule } from 'src/modules/module-system/tokens/tokens.module';
import { GoogleStrategy } from 'src/common/strategyAuthentication/google.strategy';
import { FacebookStrategy } from 'src/common/strategyAuthentication/facebook.strategy';
import { GithubStrategy } from 'src/common/strategyAuthentication/github.strategy';

@Module({
  imports: [TokensModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, GithubStrategy],
})
export class AuthModule {}
