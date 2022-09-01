/* eslint-disable no-console */
import { createConnections } from 'typeorm';

createConnections()
  .then(() => console.log('📖 Successfully connected with database'))
  .catch(error => console.log(`😧 error connected with database: ${error}`));
