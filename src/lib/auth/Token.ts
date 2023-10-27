import * as dotenv from 'dotenv';
import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { TUser } from '../types';
import User from '../../database/models/User';
import HttpError from '../http/HttpError';
import HttpStatusCode from '../http/HttpStatusCode';

dotenv.config();

class Token {
  private _config: jwt.SignOptions;

  protected secret: string;

  constructor(config: jwt.SignOptions) {
    this._config = config;
    this.secret = process.env.JWT_SECRET || 'tGI$6wEi:.WL';
  }

  generate = (userData: TUser) => {
    const token = jwt.sign({ data: userData }, this.secret, this._config);
    return token;
  };

  validate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const {
        data: { id },
      } = jwt.verify(token, this.secret) as jwt.JwtPayload;

      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new HttpError(HttpStatusCode.Unauthorized, 'Invalid token');
      }

      req.body.user = user;

      return next();
    } catch (err) {
      return next(err);
    }
  };
}

export default Token;
