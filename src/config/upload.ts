/* eslint-disable @typescript-eslint/ban-types */
import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp/uploads');

interface IUploadConfig {
  driver: 'disk';
  tmpFolder: string;
  uploadsFolder: { [key: string]: string };
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
  };
}

export const uploadConfig = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: {
    "any": path.resolve(tmpFolder),
    "default": path.resolve(tmpFolder, 'default'),
  },
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const formattedOriginalName = file.originalname
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^.A-Z0-9]+/gi, '');

        const filename = `${fileHash}-${formattedOriginalName}`;

        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: {},
  },
} as IUploadConfig;
