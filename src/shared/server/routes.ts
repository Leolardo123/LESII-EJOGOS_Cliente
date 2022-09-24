import { Controller } from '@modules/controller/Controller';
import { SessionController } from '@modules/controller/SessionController';
import { Facade } from '@modules/facade/Facade';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();
const facade = new Facade();
const controller = new Controller(facade);
const sessionController = new SessionController();

router.get('/', (request: Request, response: Response) =>
response.send('LES - EJOGOS - 0.0.1'),
);

router.post('/users/auth', sessionController.create);

router.patch('/users/auth', sessionController.refresh);

router.get('/:route', controller.index);

router.get('/:route/:id', controller.get);

router.post('/:route', controller.create);

router.put('/:route/:id', controller.update);

router.delete('/:route/:id', controller.delete);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
