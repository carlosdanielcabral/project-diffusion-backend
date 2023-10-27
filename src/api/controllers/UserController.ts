import { Request, Response } from 'express';
import Token from '../../lib/auth/Token';
import { IUserService } from '../../lib/interfaces';
import { TUser } from '../../lib/types';
import UserService from '../services/UserService';
import HttpStatusCode from '../../lib/http/HttpStatusCode';

class UserController {
  public constructor(
    private _service: IUserService = new UserService(),
    private _token = new Token(),
  ) {
    this._service = _service;
  }

  public login = async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await this._service.login(userData);
    const token = this._token.generate(user);

    return res.status(HttpStatusCode.Ok).json({ token });
  };

  public save = async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await this._service.save(userData);
    const token = this._token.generate(user);

    return res.status(HttpStatusCode.Ok).json({ token });
  };

  public findAll = async (req: Request, res: Response) => {
    const { name } = req.query;
    let user: TUser[];

    if (name) {
      user = await this._service.findAllByFilter('name', String(name));
    } else {
      user = await this._service.findAll();
    }

    return res.status(HttpStatusCode.Ok).json(user);
  };

  public update = async (req: Request, res: Response) => {
    const { user, ...userData } = req.body;
    userData.id = user;
    await this._service.update(userData);

    return res.status(HttpStatusCode.NoContent).end();
  };
}

export default UserController;
