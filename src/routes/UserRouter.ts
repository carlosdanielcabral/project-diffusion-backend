import { Router } from 'express';
import UserController from '../controllers/UserController';
import emailValidation from '../middlewares/emailValidation';
import nameValidation from '../middlewares/nameValidation';
import passwordValidation from '../middlewares/passwordValidation';

class UserRouter {
  private _router: Router;

  private _user: UserController;

  constructor(router: Router, user: UserController) {
    this._router = router;
    this._user = user;

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
    this._router.get('/', this._user.findAll);
  }
}

export default UserRouter;
