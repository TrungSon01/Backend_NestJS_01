import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokensModule } from 'src/modules/module-system/tokens/tokens.module';

@Module({
  imports: [TokensModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
