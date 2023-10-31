export type TErrorMessage = {
  message: string;
};

export type TPost = {
  id?: number;
  authorId?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: {
    id: number;
    name: string;
  };
};

export type TPostField =
  | 'id'
  | 'authorId'
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
