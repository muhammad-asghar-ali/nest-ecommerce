import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

if (process.env.NODE_DEV === 'test') {
  console.log('-------------- Test ENV ------------');
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
