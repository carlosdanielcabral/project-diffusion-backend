import { NextFunction, Request, Response } from 'express';
import { IPostService } from '../interfaces';
import { TPost } from '../types';

class PostController {
  constructor(private _service: IPostService) {
    this._service = _service;
  }

  save = async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...postData } = req.body;
    try {
      postData.author = user.id;
      const post = await this._service.save(postData);
      return res.status(201).json(post);
    } catch (err) {
      return next(err);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
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

  remove = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { id } = req.params;
    try {
      await this._service.remove(Number(user.id), Number(id));
      return res.status(200).end();
    } catch (err) {
      return next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...postData } = req.body;
    const { id } = req.params;
    try {
      postData.id = id;
      postData.author = user.id;
      const response = await this._service.update(postData);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
}

export default PostController;
