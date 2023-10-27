import { NextFunction, Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../../lib/auth/Token';
import { JWT_CONFIG } from '../../lib/consts';
import { IUserService } from '../../lib/interfaces';
import { TUser } from '../../lib/types';
import UserService from '../services/UserService';

class UserController {
  public constructor(private _service: IUserService = new UserService()) {
    this._service = _service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
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

  public save = async (req: Request, res: Response, next: NextFunction) => {
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

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
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

  public update = async (req: Request, res: Response, next: NextFunction) => {
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
