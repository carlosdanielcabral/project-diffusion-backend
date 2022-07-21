import { Router } from 'express';
import PostRouter from './PostRouter';
import UserRouter from './UserRouter';

class Route {
  private _router: Router;

  private _user: UserRouter;

  private _post: PostRouter;

  constructor(router: Router, user: UserRouter, post: PostRouter) {
    this._router = router;
    this._user = user;
    this._post = post;

    this.config();
  }

  get router() {
    return this._router;
  }

  config = () => {
    this._router.use('/user', this._user.router);
    this._router.use('/post', this._post.router);
  };
}

export default Route;
