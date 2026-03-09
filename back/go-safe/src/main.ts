import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000; // ✅ definimos la variable
  await app.listen(port);
  console.log(`Escuchando en el puerto ${port}`);
}
bootstrap();