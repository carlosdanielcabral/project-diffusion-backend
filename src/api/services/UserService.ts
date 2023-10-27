import { Op } from 'sequelize';
import User from '../../database/models/User';
import ErrorHandler from '../../lib/ErrorHandler';
import { IUserService } from '../../lib/interfaces';
import { TUser, TUserField } from '../../lib/types';

class UserService implements IUserService {
  public constructor(private _model = User) {
    this._model = _model;
  }

  public findAllByFilter = async (
    field: TUserField,
    value: string | number,
  ): Promise<TUser[]> => {
    const user = await this._model.findAll({
      where: { [field]: { [Op.like]: `%${value}%` } },
      attributes: ['id', 'name', 'email'],
      raw: true,
    });

    return user;
  };

  public findAll = async (): Promise<TUser[]> => {
    const user = await this._model.findAll({
      attributes: ['id', 'name', 'email'],
      raw: true,
    });

    return user;
  };

  public findOne = async (
    field: TUserField,
    value: string | number,
  ): Promise<TUser> => {
    const user = await this._model.findOne({
      where: { [field]: value },
      raw: true,
    });

    if (!user) throw new ErrorHandler(404, 'User not found');

    return user;
  };

  public login = async (data: TUser): Promise<TUser> => {
    try {
      const user = await this.findOne('email', data.email);

      if (user.password !== data.password) {
        throw new ErrorHandler(401, 'Invalid email or password');
      }

      const { password, ...userData } = user;

      return userData;
    } catch (error) {
      throw new ErrorHandler(401, 'Invalid email or password');
    }
  };

  public save = async (data: TUser): Promise<TUser> => {
    const hasUser = await this._model.findOne({ where: { email: data.email } });

    if (hasUser) throw new ErrorHandler(409, 'Email already exists');

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
