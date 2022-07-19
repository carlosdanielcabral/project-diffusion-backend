import User from '../database/models/User';
import ErrorHandler from '../helpers/ErrorHandler';
import { IUserService } from '../interfaces';
import { TUser } from '../types';

class UserService implements IUserService {
  constructor(private _model = User) {
    this._model = _model;
  }

  save = async (data: TUser): Promise<TUser> => {
    const hasUser = await this._model.findOne({ where: { email: data.email } });
    if (hasUser) throw new ErrorHandler(409, 'Email already exists');
    return this._model.create(data);
  }
}

export default UserService;
