import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces';

class UserController {
  constructor(private _service: IUserService) {
    this._service = _service;
  }

  save = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
      const user = await this._service.save(userData);
      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
