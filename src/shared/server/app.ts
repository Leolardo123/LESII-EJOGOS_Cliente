import express, { json, Request } from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import { uploadConfig } from '@config/upload';
import { globalErrorHandler } from '../middleware/globalErrorHandler';
import { router } from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(json());

app.use(json());

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/files/default', express.static(uploadConfig.uploadsFolder));

app.use(router);

app.use(globalErrorHandler);

export { app };
