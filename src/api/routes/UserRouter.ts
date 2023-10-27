import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/User.middleware';

class UserRouter {
  public constructor(
    private _router = Router(),
    private _controller = new UserController(),
    private _middleware = new UserMiddleware(),
  ) {
    this.config();
  }

  get router() {
    return this._router;
  }

  private config = () => {
    this._router.post('/', this._middleware.save, this._controller.save);

    this._router.post('/login', this._middleware.login, this._controller.login);

    this._router.get('/', this._controller.findAll);

    this._router.put('/', this._middleware.update, this._controller.update);
  };
}

export default UserRouter;
