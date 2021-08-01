import 'reflect-metadata';

import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import 'dotenv/config'
import cors from 'cors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Servidor backend iniciado na porta 3000');
});
