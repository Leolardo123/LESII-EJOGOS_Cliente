/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export async function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response<any>> {
  console.log(`Error - ${err} 
  URL - [${request.method}] - ${request.url}
  Request:
  body - ${JSON.stringify(request.body)}, 
  params - ${JSON.stringify(request.params)}, 
  query - ${JSON.stringify(request.query)}`);

  return response.status(500).json({
    status: 'error',
    message: err.message || 'erro interno',
  });
}
