export interface IJwtOptions {
  access: {
    secret: string;
    signOptions: {
      expiresIn: string;
    };
  };
  refresh: {
    secret: string;
    signOptions: {
      expiresIn: string;
    };
  };
}
