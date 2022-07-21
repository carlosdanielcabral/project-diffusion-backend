import User from '../database/models/User';
import ErrorHandler from '../helpers/ErrorHandler';
import { IUserService } from '../interfaces';
import { TUser, TUserField } from '../types';

class UserService implements IUserService {
  constructor(private _model = User) {
    this._model = _model;
  }

  findOne = async (
    field: TUserField,
    value: string | number,
  ): Promise<TUser> => {
    const user = await this._model.findOne({ where: { [field]: value } });

    if (!user) throw new ErrorHandler(404, 'User not found');

    return user;
  };

  login = async (data: TUser): Promise<TUser> => {
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

  save = async (data: TUser): Promise<TUser> => {
    const hasUser = await this._model.findOne({ where: { email: data.email } });

    if (hasUser) throw new ErrorHandler(409, 'Email already exists');

    return this._model.create(data);
  };
}

export default UserService;
