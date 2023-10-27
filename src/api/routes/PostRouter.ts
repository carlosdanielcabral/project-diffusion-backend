import { Router } from 'express';
import PostController from '../controllers/PostController';
import PostMiddleware from '../middlewares/Post.middleware';

class PostRouter {
  public constructor(
    private _router = Router(),
    private _controller = new PostController(),
    private _middleware = new PostMiddleware(),
  ) {
    this.config();
  }

  get router() {
    return this._router;
  }

  private config() {
    this._router.post('/', this._middleware.save, this._controller.save);
    this._router.get('/', this._controller.findAll);
    this._router.put('/:id', this._middleware.update, this._controller.update);
    this._router.delete(
      '/:id',
      this._middleware.delete,
      this._controller.remove,
    );
  }
}

export default PostRouter;
