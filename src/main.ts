import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common';
import { LoggerService } from './common';
import helmet from 'helmet';
import { LoggingInterceptor } from './common';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
    maxAge: parseInt(process.env.CORS_MAX_AGE),
    exposedHeaders: ['Set-Cookie'],
  });

  // SECURITY
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(helmet());


  // Filter
  app.useGlobalFilters(
    new AllExceptionFilter(new LoggerService()),
  );

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true })
  );


  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));



  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
