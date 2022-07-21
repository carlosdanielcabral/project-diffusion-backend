import { TErrorMessage, TUser } from '../types';

export interface IUserService {
  save: (data: TUser) => Promise<TUser>;
}

export interface IErrorHandler extends Error {
  status?: number;
  isJoi?: boolean;
  details?: TErrorMessage[];
}
