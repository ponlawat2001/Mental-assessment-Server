import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initializeFirebase } from 'src/firebase.init';

async function bootstrap() {
  initializeFirebase();
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  app.use(cors());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
