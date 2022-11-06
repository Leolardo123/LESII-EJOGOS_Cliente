import { jwt_config } from "@config/auth";
import { DAOUser } from "@modules/repositories/DAOUser";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import axios from "axios";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

class SessionController {
    frete = async (req: Request, res: Response) => {
        const externalApi = axios.create({
            baseURL: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx',
        });

        const getValue = externalApi

        res.status(201).json();
    }
}

export { SessionController }