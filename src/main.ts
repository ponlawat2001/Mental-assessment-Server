import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  fs.initializeApp({
    credential: fs.credential.cert(require('./services/SA_KEY.json')),
  });

  await app.listen(3000);
}

bootstrap();
