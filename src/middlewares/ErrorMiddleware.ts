import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../helpers/ErrorHandler';
import { IErrorHandler } from '../interfaces';

const ErrorMiddleware = (
  err: IErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default ErrorMiddleware;
