import { jwt_config } from "@config/auth";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { DAOUser } from "@modules/repositories/DAOUser";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

class SessionController{
    create = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = (await new DAOUser().find(`WHERE email = '${email}'`))[0];

        if(!user || password != user.password){
            return res.status(401).json({message: 'Email ou senha inválidos.'});
        }

        const jwToken = sign({ sub: user.id, isMaster: user.role === UserRolesEnum.admin }, jwt_config.secret, {
            expiresIn: jwt_config.expiresIn,
        });

        const { password: _, ...userWithoutPassword } = user;

        res.json({ userWithoutPassword, access_token: jwToken });
    }
}

export { SessionController }