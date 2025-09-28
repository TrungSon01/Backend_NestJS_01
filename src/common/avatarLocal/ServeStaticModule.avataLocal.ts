import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

export const ServerAvatarUser = ServeStaticModule.forRoot({
  rootPath: join(process.cwd(), 'public/images'),
  serveRoot: '/images',
});
