import { Facade } from "@modules/facade/Facade";
import { IFacade } from "@modules/facade/IFacade";
import User from "@modules/models/users/User";
import { Request, Response } from "express";
class UserController{
    async create(req: Request, res: Response){
        const {
            role,
            email,
            password,
            person,
        } = req.body;

        const user = new User(
            {
                role,
                email,
                password,
                person,
            }
        )
        
        const facade = new Facade();
        const msg = await facade.create(user);

        return res.json({ msg })
    }
    async update(req: Request, res: Response){
        const {
            role,
            email,
            password,
            person,
        } = req.body;
        const { id } = req.params;

        const user = new User(
            {
                id: Number(id),
                role,
                email,
                password,
                person,
            }
        )
        
        const facade = new Facade();
        const msg = await facade.update(user);

        return res.json({ msg })
    }
    async delete(req: Request, res: Response){
        const {
            role,
            email,
            password,
            person,
        } = req.body;
        const { id } = req.params;

        const user = new User(
            {
                id: Number(id),
                role,
                email,
                password,
                person,
            }
        )
        
        const facade = new Facade();
        const msg = await facade.delete(user);

        return res.json({ msg })
    }
    async get(req: Request, res: Response){
        const {
            role,
            email,
            password,
            person,
        } = req.body;
        const { id } = req.params;


        const user = new User(
            {
                id: id ? Number(id) : undefined,
                role,
                email,
                password,
                person,
            }
        )
        
        const facade = new Facade();
        const msg = await facade.query(user);

        return res.json({ msg })
    }
}

export { UserController }