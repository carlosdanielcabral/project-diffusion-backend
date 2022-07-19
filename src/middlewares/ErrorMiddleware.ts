import { NextFunction, Request, RequestHandler, Response } from 'express';
import ErrorHandler from '../helpers/ErrorHandler';

const ErrorMiddleware = (
  err: Error | ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default ErrorMiddleware;
