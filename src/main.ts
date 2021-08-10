import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('src/ssl/private.pem'),
    cert: fs.readFileSync('src/ssl/public.pem')
  }

  const app = await NestFactory.create(
    AppModule, 
    {
      cors: true,
      httpsOptions
    });
  await app.listen(3000);
}
bootstrap();
