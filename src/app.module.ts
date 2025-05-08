import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  // here we are setting up the mail module 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
    transport:{
      host: process.env.EMAIL_HOST,
      port:process.env.EMAIL_PORT ? +process.env.EMAIL_PORT : undefined,
      auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      }
    },
    template: {
      dir: path.join(__dirname, 'templates/email'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    }
  }),

  MailModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
