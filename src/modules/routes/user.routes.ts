import { UserController } from "@modules/controller/UserController";
import { Router } from "express";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.get)

userRouter.get('/:id', userController.get)

userRouter.post('/', userController.create)

userRouter.put('/:id', userController.update)

userRouter.delete('/:id', userController.delete)

export {userRouter}