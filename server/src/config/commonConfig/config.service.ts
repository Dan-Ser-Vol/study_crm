import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class CommonConfigService {
  constructor(
    @Inject(configuration.KEY)
    private commonConfiguration: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.commonConfiguration.host;
  }
  get app_port(): number {
    return Number(this.commonConfiguration.app_port);
  }

  get redis_url(): string {
    return this.commonConfiguration.redis_url;
  }
  get jwt_access_secret(): string {
    return this.commonConfiguration.jwt_access_secret;
  }
  get jwt_access_expires_in(): string {
    return this.commonConfiguration.jwt_access_expires_in;
  }

  get jwt_refresh_secret(): string {
    return this.commonConfiguration.jwt_refresh_secret;
  }
  get jwt_refresh_expires_in(): string {
    return this.commonConfiguration.jwt_refresh_expires_in;
  }

  get jwt_secret(): string {
    return this.commonConfiguration.jwt_refresh_secret;
  }
  get jwt_expires_in(): string {
    return this.commonConfiguration.jwt_refresh_expires_in;
  }
}
