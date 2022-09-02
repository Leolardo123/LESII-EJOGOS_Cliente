import User from "@modules/models/users/User";
import { Request, Response } from "express";

export class UserController{
    create(req: Request, res: Response){
        const {
            role,
            email,
            password,
            person,
        } = req.body;

        const user = new User(
            role,
            email,
            password,
            person,
        )

        
    }
}