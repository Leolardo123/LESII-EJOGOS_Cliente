
import { UserController } from "@modules/controller/UserController";
import { Facade } from "@modules/facade/Facade";
import { Router } from "express";

const userRouter = Router();
const facade = new Facade();
const userController = new UserController(facade);

userRouter.get('/', userController.get)

userRouter.get('/:id', userController.get)

userRouter.post('/', userController.create)

userRouter.put('/:id', userController.update)

userRouter.delete('/:id', userController.delete)

export default userRouter