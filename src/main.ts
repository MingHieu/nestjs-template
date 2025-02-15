import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guard';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { HttpExceptionFilter } from './common/filter';
import { LoggingInterceptor, ResponseInterceptor } from './common/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  const reflector = app.get(Reflector);
  const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalGuards(new JwtGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(json({ limit: '50mb' }));
  await app.listen(config.get('PORT'));
}
bootstrap();
