import { NextFunction, Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../auth/Token';
import { JWT_CONFIG } from '../consts';
import { IUserService } from '../interfaces';

class UserController {
  constructor(private _service: IUserService) {
    this._service = _service;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
      const user = await this._service.login(userData);

      const token = new Token(JWT_CONFIG as SignOptions);
      const tokenValue = token.generate(user);

      return res.status(200).json({ token: tokenValue });
    } catch (err) {
      return next(err);
    }
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
      const user = await this._service.save(userData);

      const token = new Token(JWT_CONFIG as SignOptions);
      const tokenValue = token.generate(user);

      return res.status(201).json({ token: tokenValue });
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
