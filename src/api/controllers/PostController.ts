import { Request, Response } from 'express';
import { IPostService } from '../../lib/interfaces';
import { TPost } from '../../lib/types';
import PostService from '../services/PostService';
import HttpStatusCode from '../../lib/http/HttpStatusCode';

class PostController {
  public constructor(private _service: IPostService = new PostService()) {
    this._service = _service;
  }

  public save = async (req: Request, res: Response) => {
    const { user, ...postData } = req.body;

    postData.author = user;
    await this._service.save(postData);

    return res.status(HttpStatusCode.NoContent).end();
  };

  public findAll = async (req: Request, res: Response) => {
    const { author } = req.query;
    let post: TPost[];

    if (author) {
      post = await this._service.findAllByFilter('author', Number(author));
    } else {
      post = await this._service.findAll();
    }

    return res.status(HttpStatusCode.Ok).json(post);
  };

  public remove = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { id } = req.params;

    await this._service.remove(Number(user), Number(id));

    return res.status(HttpStatusCode.NoContent).end();
  };

  public update = async (req: Request, res: Response) => {
    const { user, ...postData } = req.body;
    const { id } = req.params;

    postData.id = id;

    const response = await this._service.update(postData, Number(id));

    return res.status(200).json(response);
  };
}

export default PostController;
