import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useBodyParser('json', { limit: '20mb' });
  app.enableCors();
  app.setViewEngine('ejs');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: Object.values(errors[0].constraints).join('. ').trim(),
        });
        //
      },
    }),
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
