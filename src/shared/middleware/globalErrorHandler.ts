/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export async function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response<any>> {
  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: err.message || 'erro interno',
  });
}
