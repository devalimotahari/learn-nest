import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configDotenv } from 'dotenv';

configDotenv();
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(PORT);
}

bootstrap().then(() => {
  console.info('App Run successfully');
});
