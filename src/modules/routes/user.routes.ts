
import { UserController } from "@modules/controller/UserController";
import { Router } from "express";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.get)

userRouter.post('/', userController.create)

userRouter.put('/', userController.update)

userRouter.delete('/', userController.delete)

export default userRouter