const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000'),
  debug: process.env.APP_DEBUG === 'true',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
  jwtAccessSecretExpiresIn: process.env.JWT_ACCESS_SECRET_EXPIRES_IN || '15m',
  jwtRefreshSecretExpiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN || '30d',
};

export default config;
