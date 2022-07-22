import { TErrorMessage, TPost, TPostField, TUser, TUserField } from '../types';

export interface IPostService {
  findAll: () => Promise<TPost[]>;
  findAllByFilter: (
    field: TPostField,
    value: number | string,
  ) => Promise<TPost[]>;
  findOne: (field: TPostField, value: number | string) => Promise<TPost>;
  save: (data: TPost) => Promise<TPost>;
  remove: (userId: number, postI: number) => Promise<TPost>;
  update: (data: TPost, userId: number) => Promise<TPost>;
}

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
