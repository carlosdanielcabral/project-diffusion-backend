import 'express-async-errors';
import { Router } from 'express';
import PostRouter from './PostRouter';
import UserRouter from './UserRouter';

class Route {
  public constructor(
    private _router: Router,
    private _user: UserRouter,
    private _post: PostRouter,
  ) {
    this.config();
  }

  get router() {
    return this._router;
  }

  private config = () => {
    this._router.use('/user', this._user.router);
    this._router.use('/post', this._post.router);
  };
}

export default Route;
