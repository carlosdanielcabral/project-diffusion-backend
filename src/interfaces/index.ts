import { TErrorMessage, TUser, TUserField } from '../types';

export interface IUserService {
  findAll: () => Promise<TUser[]>;
  findAllByFilter: (
    field: TUserField,
    value: number | string,
  ) => Promise<TUser[]>;
  findOne: (field: TUserField, value: number | string) => Promise<TUser>;
  login: (data: TUser) => Promise<TUser>;
  save: (data: TUser) => Promise<TUser>;
  update: (data: TUser) => Promise<TUser>;
}

export interface IErrorHandler extends Error {
  status?: number;
  isJoi?: boolean;
  details?: TErrorMessage[];
}
