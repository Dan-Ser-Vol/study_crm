import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';

import { CommonConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`environments/${process.env.NODE_ENV}.env`],
    }),
  ],
  providers: [ConfigService, CommonConfigService],
  exports: [ConfigService, CommonConfigService],
})
export class CommonConfigModule {}
