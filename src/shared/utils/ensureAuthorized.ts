import { jwt_config } from '@config/auth';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default function ensureAuthorized(roles: number[]): any {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Token JWT inexistente!');
    }

    const [, token] = authHeader.split(' ');

    if (roles.length) {

      if (!request.headers.authorization) {
        throw new Error('Usúario não autorizado');
      }
      let tokenData = verify(token, jwt_config.secret as string) as JwtPayload;

      if (
        !tokenData.role_id ||
        !roles.some(item => tokenData.role_id == item)
      ) {
        throw new Error('Usúario não autorizado');
      }
    }

    return next();
  };
}
