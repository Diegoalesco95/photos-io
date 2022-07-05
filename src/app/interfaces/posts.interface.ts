import { User } from "src/app/interfaces/user.interface";

export interface PostsResponse {
  count: number;
  page: number;
  posts: Post[];
}

export interface Post {
  _id?: string;
  message?: string;
  imgs?: string[];
  coords?: string;
  user?: User;
  createdAt?: Date;
}
