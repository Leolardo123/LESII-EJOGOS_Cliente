import { IFacade } from "@modules/facade/IFacade";
import Person from "@modules/models/users/Person";
import User from "@modules/models/users/User";
import { Request, Response } from "express";

export class UserController{
    private facade:IFacade;
    
    constructor(facade: IFacade){
        this.facade = facade;
    }

    create(req: Request, res: Response){
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
            }
        )

        user.person = new Person(person);

        this.facade.create(user)
    }
    update(req: Request, res: Response){
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

        this.facade.update(user)
    }
    delete(req: Request, res: Response){
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

        this.facade.delete(user);
    }
    get(req: Request, res: Response){
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

        this.facade.query(user);
    }
}