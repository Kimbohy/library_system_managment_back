import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true, // Allow any origin during development
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  }); // Enable CORS with specific configuration
  // there two lines of code below are a way to use a global guard but it is no longer necessary because we are using the APP_GUARD provider in the AppModule
  // const reflector = new Reflector
  // app.useGlobalGuards(new AtGuard(reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
