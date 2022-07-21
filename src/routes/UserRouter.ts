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

  config(): void {
    this._router.post(
      '/',
      nameValidation,
      emailValidation,
      passwordValidation,
      this._user.save,
    );
  }

  get router() {
    return this._router;
  }
}

export default UserRouter;
