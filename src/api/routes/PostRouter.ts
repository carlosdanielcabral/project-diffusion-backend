import { Router } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../../lib/auth/Token';
import { JWT_CONFIG } from '../../lib/consts';
import PostController from '../controllers/PostController';
import PostMiddleware from '../middlewares/Post.middleware';

class PostRouter {
  public constructor(
    private _router = Router(),
    private _post = new PostController(),
    private _middleware = new PostMiddleware(),
  ) {
    this.config();
  }

  get router() {
    return this._router;
  }

  private config() {
    const token = new Token(JWT_CONFIG as SignOptions);

    this._router.post(
      '/',
      this._middleware.save,
      token.validate,
      this._post.save,
    );

    this._router.get('/', token.validate, this._post.findAll);

    this._router.put(
      '/:id',
      this._middleware.update,
      token.validate,
      this._post.update,
    );

    this._router.delete(
      '/:id',
      this._middleware.delete,
      token.validate,
      this._post.remove,
    );
  }
}

export default PostRouter;
