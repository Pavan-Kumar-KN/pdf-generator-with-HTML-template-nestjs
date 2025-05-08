import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // / Debug log to check if env vars are loaded
  console.log('EMAIL_USER:', process.env.GMAIL_USER);
  // console.log('EMAIL_HOST:', ConfigService.get('EMAIL_HOST'));

  await app.listen(process.env.PORT ?? 3080);
}
bootstrap();