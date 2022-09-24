import { Request } from "express";
import { verify } from "jsonwebtoken";

import { jwt_config } from "@config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: number;
  person?: string;
  role: string;
}

interface IRequestUser {
  id: number;
  person?: string;
  role: string;
}

function ensureAuthenticated(request: Request): IRequestUser {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token JWT inexistente!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, jwt_config.secret as string);

    const { sub, role, person } = decoded as ITokenPayload;

    return {
      id: sub,
      role,
      person,
    };
  } catch (error) {
    throw new Error("Token Inválido");
  }
}

export { ensureAuthenticated };
