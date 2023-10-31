import { Op } from 'sequelize';
import Post from '../../database/models/Post';
import User from '../../database/models/User';
import { IPostService } from '../../lib/interfaces';
import { TPost, TPostField } from '../../lib/types';
import HttpError from '../../lib/http/HttpError';
import HttpStatusCode from '../../lib/http/HttpStatusCode';
import Category from '../../database/models/Category';

class PostService implements IPostService {
  public constructor(private _model = Post) {
    this._model = _model;
  }

  public findAllByFilter = async (
    field: TPostField,
    value: string | number,
  ): Promise<TPost[]> =>
    this._model.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'author',
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'categories'
        }
      ],
      where: { [field]: { [Op.like]: `%${value}%` } },
      raw: true,
      attributes: {
        exclude: ['authorId'],
      }
    });

  public findAll = async (): Promise<TPost[]> =>
    this._model.findAll({
      include:  [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'author',
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'categories'
        }
      ],
      attributes: {
        exclude: ['authorId'],
      }
    });

  public findOne = async (
    field: TPostField,
    value: string | number,
  ): Promise<TPost> => {
    const post = await this._model.findOne({
      where: { [field]: value },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'author',
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'categories'
        }
      ],
      raw: true,
      attributes: {
        exclude: ['authorId'],
      }
    });

    if (!post) {
      throw new HttpError(HttpStatusCode.NotFound, 'Post not found');
    }

    return post;
  };

  public remove = async (userId: number, postId: number): Promise<TPost> => {
    const post = await this.findOne('id', postId);

    if (post.authorId !== userId) {
      throw new HttpError(HttpStatusCode.Unauthorized, 'Not allowed operation');
    }

    await this._model.destroy({ where: { id: postId } });

    return post;
  };

  public save = async (data: TPost): Promise<TPost> => {
    const hasPost = await this._model.findOne({
      where: { title: data.title },
    });

    const now = new Date();

    const newPost = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    if (hasPost) {
      throw new HttpError(HttpStatusCode.Conflict, 'Post already exists');
    }

    return this._model.create(newPost);
  };

  public update = async (data: TPost, userId: number): Promise<TPost> => {
    const post = await this._model.findOne({
      where: { id: data.id },
    });

    if (!post) {
      throw new HttpError(HttpStatusCode.NotFound, 'Post not found');
    }

    if (post.authorId !== userId) {
      throw new HttpError(HttpStatusCode.Unauthorized, 'Not allowed operation');
    }

    const now = new Date();

    const newPost = { ...data, updatedAt: now };

    await this._model.update(newPost, { where: { id: post.id } });

    return this._model.findByPk(data.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'author',
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'categories'
        }
      ],
      attributes: {
        exclude: ['authorId'],
      }
    });
  };
}

export default PostService;
