import { IUser } from 'src/app/interfaces/user.interface';

export interface IPostsResponse {
  count: number;
  page: number;
  posts: IPost[];
}

export interface IPost {
  _id?: string;
  message?: string;
  imgs?: string[];
  coords?: string;
  user?: IUser;
  createdAt?: Date;
}

export interface ICreatPostResponse {
  post: IPost;
}
