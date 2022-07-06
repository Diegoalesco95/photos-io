export interface IAvatar {
  img: string;
  selected: boolean;
}

export interface IUser {
  _id?: string;
  avatar?: string;
  email?: string;
  name?: string;
  password?: string;
}

export interface IUserResponse {
  token?: string;
  user?: IUser;
  message?: string;
}
