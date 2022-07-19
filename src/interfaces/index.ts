import { TUser } from '../types';

export interface IUserService {
  save: (data: TUser) => Promise<TUser>;
}
