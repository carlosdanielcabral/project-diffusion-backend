import { Router } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../../lib/auth/Token';
import { JWT_CONFIG } from '../../lib/consts';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/User.middleware';

class UserRouter {
  public constructor(
    private _router = Router(),
    private _user = new UserController(),
    private _middleware = new UserMiddleware(),
  ) {
    this.config();
  }

  get router() {
    return this._router;
  }

  private config = () => {
    this._router.post(
      '/',
      this._middleware.save,
      this._user.save,
    );

    this._router.post(
      '/login',
      this._middleware.login,
      this._user.login,
    );

    const token = new Token(JWT_CONFIG as SignOptions);

    this._router.get('/', this._user.findAll);

    this._router.put(
      '/',
      this._middleware.update,
      token.validate,
      this._user.update,
    );
  }
}

export default UserRouter;
