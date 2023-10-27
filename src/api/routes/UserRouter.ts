import { Router } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../../lib/auth/Token';
import { JWT_CONFIG } from '../../lib/consts';
import UserController from '../controllers/UserController';
import emailValidation from '../middlewares/emailValidation';
import nameValidation from '../middlewares/nameValidation';
import passwordValidation from '../middlewares/passwordValidation';

class UserRouter {
  constructor(
    private _router = Router(),
    private _user = new UserController()
  ) {
    this.config();
  }

  get router() {
    return this._router;
  }

  config() {
    this._router.post(
      '/',
      nameValidation,
      emailValidation,
      passwordValidation,
      this._user.save,
    );

    this._router.post(
      '/login',
      emailValidation,
      passwordValidation,
      this._user.login,
    );

    const token = new Token(JWT_CONFIG as SignOptions);

    this._router.get('/', this._user.findAll);

    this._router.put(
      '/',
      nameValidation,
      emailValidation,
      token.validate,
      this._user.update,
    );
  }
}

export default UserRouter;
