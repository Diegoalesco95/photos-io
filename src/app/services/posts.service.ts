import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { PostsResponse } from 'src/app/interfaces/posts.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postPage = 0;

  constructor(private http: HttpClient) {}

  getPosts() {
    this.postPage++;

    return this.http.get<PostsResponse>(`${API_URL}/posts`, {
      params: {
        page: this.postPage,
      },
    });
  }
}
