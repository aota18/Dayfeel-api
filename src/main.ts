import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  

  let httpsOptions = process.env.NODE_ENV==='development' ? {} : {
    key: fs.readFileSync('/usr/share/private.pem'),
    cert: fs.readFileSync('/usr/share/fullchain.pem')
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
