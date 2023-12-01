import { MailerModule } from '@nestjs-modules/mailer';

import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PartnerModule } from './partner/partner.module';
import { UserModule } from './user/user.module';
import { CommonService } from './utils/services/common.service';

require('dotenv').config();

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_DB_LINK),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        template: {
          dir: __dirname + '\templates',
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
