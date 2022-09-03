
import userRouter from '@modules/routes/user.routes';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) =>
  response.send('LES - EJOGOS - 0.0.1'),
);

router.post('/users', userRouter);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
