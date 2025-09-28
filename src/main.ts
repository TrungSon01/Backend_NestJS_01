import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT } from './common/constant/app.constant';
import { ProtecthGuard } from './common/protect/protect.guard';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // domain của frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // nếu có dùng cookie
  });
  app.useGlobalGuards(new ProtecthGuard(reflector));
  await app.listen(PORT, () => {
    logger.verbose(`Server is running on http://localhost:${PORT}/api`);
  });
}
bootstrap();
