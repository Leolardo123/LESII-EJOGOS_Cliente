import { jwt_config } from '@config/auth';
import { AppError } from '@shared/error/AppError';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default function ensureAuthorized(roles: number[]): any {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token JWT inexistente!', 404);
    }

    const [, token] = authHeader.split(' ');

    if (roles.length) {

      if (!request.headers.authorization) {
        throw new AppError('Usúario não autorizado', 401);
      }
      let tokenData = verify(token, jwt_config.secret as string) as JwtPayload;

      if (
        !tokenData.role_id ||
        !roles.some(item => tokenData.role_id == item)
      ) {
        throw new AppError('Usúario não autorizado', 401);
      }
    }

    return next();
  };
}
