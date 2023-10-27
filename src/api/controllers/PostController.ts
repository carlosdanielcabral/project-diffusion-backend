import { NextFunction, Request, Response } from 'express';
import { IPostService } from '../../lib/interfaces';
import { TPost } from '../../lib/types';
import PostService from '../services/PostService';

class PostController {
  public constructor(private _service: IPostService = new PostService()) {
    this._service = _service;
  }

  public save = async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...postData } = req.body;
    try {
      postData.author = user.id;
      const post = await this._service.save(postData);
      return res.status(201).json(post);
    } catch (err) {
      return next(err);
    }
  };

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    const { author } = req.query;
    try {
      let post: TPost[];

      if (author) {
        post = await this._service.findAllByFilter('author', Number(author));
      } else {
        post = await this._service.findAll();
      }

      return res.status(200).json(post);
    } catch (err) {
      return next(err);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { id } = req.params;
    try {
      await this._service.remove(Number(user.id), Number(id));
      return res.status(200).end();
    } catch (err) {
      return next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...postData } = req.body;
    const { id } = req.params;
    try {
      postData.id = id;
      const response = await this._service.update(postData, Number(id));
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
}

export default PostController;
