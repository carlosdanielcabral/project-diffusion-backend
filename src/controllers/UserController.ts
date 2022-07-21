import { NextFunction, Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../auth/Token';
import { JWT_CONFIG } from '../consts';
import { IUserService } from '../interfaces';
import { TUser } from '../types';

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

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    try {
      let user: TUser[];

      if (name) {
        user = await this._service.findAllByFilter('name', String(name));
      } else {
        user = await this._service.findAll();
      }

      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...userData } = req.body;
    try {
      userData.id = user.id;
      const response = await this._service.update(userData);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
