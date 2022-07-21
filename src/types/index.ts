export type TErrorMessage = {
  message: string;
};

export type TUser = {
  id?: number;
  name?: string;
  email: string;
  password?: string;
};

export type TUserField = 'id' | 'name' | 'email';
