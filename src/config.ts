const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000'),
  debug: process.env.APP_DEBUG === 'true',
  appSecret: process.env.APP_SECRET || '',
  issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL || '',
  audience: process.env.AUTH0_AUDIENCE || '',
};

export default config;
