import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('common', () => ({
  host: process.env.POSTGRES_HOST,
  app_port: process.env.APP_PORT,
  redis_url: process.env.REDIS_URl,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
}));
