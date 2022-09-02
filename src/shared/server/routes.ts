
import { UserController } from '@modules/controller/UserController';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const controller = new UserController();
router.get('/', (request: Request, response: Response) =>
  response.send('LES - EJOGOS - 0.0.1'),
);

router.use('/', controller);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
