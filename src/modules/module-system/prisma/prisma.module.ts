import { Global, Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { TokensModule } from '../tokens/tokens.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [TokensModule],
})
export class PrismaModule {}
