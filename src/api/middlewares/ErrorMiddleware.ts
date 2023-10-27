import { NextFunction, Request, Response } from 'express';
import { IErrorHandler } from '../../lib/interfaces';
import HttpError from '../../lib/http/HttpError';
import { JsonWebTokenError } from 'jsonwebtoken';
import HttpStatusCode from '../../lib/http/HttpStatusCode';

const ErrorMiddleware = (
  err: IErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof JsonWebTokenError) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: err.message });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.isJoi) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ message: err.details[0].message });
  }

  console.error(err);
  return res
    .status(HttpStatusCode.InternalServerError)
    .json({ message: 'Internal Server Error' });
};

export default ErrorMiddleware;
