import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwt_config } from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role_id: number;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token JWT inexistente!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, jwt_config.secret as string);

    const { sub, role_id } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      role_id,
    };

    return next();
  } catch (error) {
    throw new Error('Token Inválido');
  }
}

export { ensureAuthenticated };
