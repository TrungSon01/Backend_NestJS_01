import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/module-api/auth/auth.module';
import { PrismaModule } from './modules/module-system/prisma/prisma.module';
import { TokensModule } from './modules/module-system/tokens/tokens.module';
import { UserModule } from './modules/module-api/user/user.module';
import { ProtectStrategy } from './common/protect/protect.strategy';
import { ManageModule } from './modules/module-api/manage/manage.module';
import { ServerAvatarUser } from './common/avatarLocal/ServeStaticModule.avataLocal';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TokensModule,
    UserModule,
    ManageModule,
    ServerAvatarUser,
  ],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy],
})
export class AppModule {}
