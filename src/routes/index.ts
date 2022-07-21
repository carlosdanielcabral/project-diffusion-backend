import { Router } from 'express';
import UserRouter from './UserRouter';

class Route {
  private _router: Router;

  private _user: UserRouter;

  constructor(router: Router, user: UserRouter) {
    this._router = router;
    this._user = user;

    this.config();
  }

  get router() {
    return this._router;
  }

  config = () => {
    this._router.use('/user', this._user.router);
  };
}

export default Route;
