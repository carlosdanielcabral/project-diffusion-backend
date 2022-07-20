import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRouter {
  private _router: Router;
  private _user: UserController;

  constructor(router: Router, user: UserController) {
    this._router = router;
    this._user = user;
    this.config();
}

  config(): void {
    this._router.post('/', this._user.save);
  };

  get router() {
    return this._router;
  }
}

export default UserRouter;
