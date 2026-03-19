import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo para todas las rutas: http://localhost:3000/api/...
  app.setGlobalPrefix('api');

  // Configuración para que funcionen los DTOs y validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000/api`);
}
bootstrap();