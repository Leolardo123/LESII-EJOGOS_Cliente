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

app.use('/files/:folder?', express.static(uploadConfig.uploadsFolder.any));

app.use(router);

app.use(globalErrorHandler);

export { app };
