import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
import morgan from 'morgan';
import cors from 'cors';

// Connecting to the database
import '@database/connection';

import { apiLimiter } from './rateLimits';
import { port } from '@config/config';
import errorHandler from '@errors/handler';
import routes from './routes';

const middlewares = [
  express.json(),
  morgan('common'),
  // TODO cors whitelist before deploy
  cors(),
  apiLimiter,
  routes,
  errorHandler,
]

const app = express();
middlewares.forEach(m => app.use(m))

app.listen(port, () => console.log(`Server listening at ${port}!`));
