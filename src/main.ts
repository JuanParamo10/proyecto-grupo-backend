import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde otras aplicaciones (como tu frontend o n8n)
  app.enableCors();

  // Configurar el prefijo global. 
  // Ahora todas tus rutas empezarán automáticamente con /api
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();