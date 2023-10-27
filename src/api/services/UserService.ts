import { Op } from 'sequelize';
import User from '../../database/models/User';
import { IUserService } from '../../lib/interfaces';
import { TUser, TUserField } from '../../lib/types';
import HttpError from '../../lib/http/HttpError';
import HttpStatusCode from '../../lib/http/HttpStatusCode';
import Hash from '../../lib/Hash';

class UserService implements IUserService {
  public constructor(private _model = User) {
    this._model = _model;
  }

  public findAllByFilter = async (
    field: TUserField,
    value: string | number,
  ): Promise<TUser[]> =>
    this._model.findAll({
      where: { [field]: { [Op.like]: `%${value}%` } },
      attributes: ['id', 'name', 'email'],
      raw: true,
    });

  public findAll = async (): Promise<TUser[]> =>
    this._model.findAll({
      attributes: ['id', 'name', 'email'],
      raw: true,
    });

  public findOne = async (
    field: TUserField,
    value: string | number,
  ): Promise<TUser> => {
    const user = await this._model.findOne({
      where: { [field]: value },
      raw: true,
    });

    if (!user) {
      throw new HttpError(HttpStatusCode.NotFound, 'User not found');
    }

    return user;
  };

  public login = async (data: TUser): Promise<TUser> => {
    const user = await this.findOne('email', data.email);

    if (!user) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        'Invalid email or password'
      );
    }

    const samePassword = Hash.compare(data.password, user.password);

    if (!samePassword) {
      throw new HttpError(
        HttpStatusCode.BadRequest,
        'Invalid email or password',
      );
    }

    const { password, ...userData } = user;

    return userData;
  };

  public save = async (data: TUser): Promise<TUser> => {
    const hasUser = await this._model.findOne({ where: { email: data.email } });

    if (hasUser) {
      throw new HttpError(HttpStatusCode.Conflict, 'Email already exists');
    }

    data.password = Hash.hash(data.password);

    return this._model.create(data);
  };

  public update = async (data: TUser): Promise<TUser> => {
    const user = await this.findOne('email', data.email);

    await this._model.update(data, { where: { id: user.id } });

    return this._model.findByPk(data.id, {
      attributes: ['id', 'name', 'email'],
    });
  };
}

export default UserService;
