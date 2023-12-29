import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { CommonConfigModule } from './config/commonConfig/config.module';
import { CommonConfigService } from './config/commonConfig/config.service';
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
    MongooseModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: async (configService: CommonConfigService) => ({
        uri: configService.mongo_db_url,
      }),
      inject: [CommonConfigService],
    }),
    UserModule,
    OrderModule,
    AuthModule,
  ],
})
export class AppModule {}
