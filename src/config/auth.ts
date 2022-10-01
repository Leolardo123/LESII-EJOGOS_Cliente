export const jwt_config = {
  secret: process.env.API_SECRET || 'default',
  expiresIn: '1d',
};

