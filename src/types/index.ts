export type TErrorMessage = {
  message: string;
};

export type TPost = {
  id?: number;
  author?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorData?: {
    id: number;
    name: string;
  };
};

export type TPostField =
  | 'id'
  | 'author'
  | 'title'
  | 'content'
  | 'createdAt'
  | 'updatedAt';

export type TUser = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
};

export type TUserField = 'id' | 'name' | 'email';
