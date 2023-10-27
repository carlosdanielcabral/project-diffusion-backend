import { NextFunction, Request, Response } from 'express';
import { IErrorHandler } from '../../lib/interfaces';
import HttpError from '../../lib/http/HttpError';

const ErrorMiddleware = (
  err: IErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default ErrorMiddleware;
