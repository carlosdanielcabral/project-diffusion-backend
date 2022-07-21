import { Router } from 'express';
import { SignOptions } from 'jsonwebtoken';
import Token from '../auth/Token';
import { JWT_CONFIG } from '../consts';
import PostController from '../controllers/PostController';
import contentValidation from '../middlewares/contentValidation';
import idValidation from '../middlewares/idValidation';
import titleValidation from '../middlewares/titleValidation';

class PostRouter {
  private _router: Router;

  private _post: PostController;

  constructor(router: Router, post: PostController) {
    this._router = router;
    this._post = post;

    this.config();
  }

  get router() {
    return this._router;
  }

  config() {
    const token = new Token(JWT_CONFIG as SignOptions);

    this._router.post(
      '/',
      titleValidation,
      contentValidation,
      token.validate,
      this._post.save,
    );

    this._router.get('/', token.validate, this._post.findAll);

    this._router.put(
      '/:id',
      idValidation,
      titleValidation,
      contentValidation,
      token.validate,
      this._post.update,
    );

    this._router.delete(
      '/:id',
      idValidation,
      token.validate,
      this._post.remove,
    );
  }
}

export default PostRouter;
