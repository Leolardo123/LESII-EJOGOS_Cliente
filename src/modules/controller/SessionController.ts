import { jwt_config } from "@config/auth";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { DAOUser } from "@modules/repositories/DAOUser";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

class SessionController{
    create = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const daoUser = new DAOUser();
        const userExists = await daoUser.findOne({ where: { email } });

        if(!userExists|| password !=  userExists.password){
            throw new Error('Email ou senha incorretos.');
        }

        const jwToken = sign(
            { 
                sub:  userExists.id, 
                role:  userExists.role, 
                person: userExists.person ? userExists.person.id : null
            }, 
            jwt_config.secret, {
                expiresIn: jwt_config.expiresIn,
            }
        );

        const { password: _, ...userWithoutPassword } =  userExists;

        res.json({ user: userWithoutPassword, access_token: jwToken });
    }
}

export { SessionController }