import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';

const environment = process.env.NODE_ENV ?? '';
dotenv.config({ path: `environments/${environment}.env` });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    UserModule,
    OrderModule,
    AuthModule,
  ],
})
export class AppModule {}
