import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Importamos el guardia

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Prefijo global (/api)
  app.setGlobalPrefix('api');

  // <-- CONFIGURACIÓN DEL GUARDIA (ValidationPipe) -->
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Bloquea y elimina cualquier dato extra que no esté en el DTO
      forbidNonWhitelisted: true, // Lanza un error 400 si intentan enviar datos no permitidos
      transform: true, // Transforma los datos al tipo correcto automáticamente
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();