import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@awesome-cordova-plugins/file-transfer/ngx';

import {
  ICreatPostResponse,
  IPost,
  IPostsResponse,
} from 'src/app/interfaces/posts.interface';
import { UserService } from './user.service';
import { UiService } from './ui.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postPage = 0;
  newPost = new EventEmitter<IPost>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private uiService: UiService,
    private transfer: FileTransfer
  ) {}

  getPosts(reset?: boolean) {
    if (reset) {
      this.postPage = 0;
    }

    this.postPage++;

    return this.http.get<IPostsResponse>(`${API_URL}/posts`, {
      params: {
        page: this.postPage,
      },
    });
  }

  async createPost(post) {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });

    return this.http
      .post<ICreatPostResponse>(`${API_URL}/posts`, post, { headers })
      .subscribe(
        (response) => {
          this.newPost.emit(response.post);
          this.uiService.presentAlert('Post created', 'success');
          this.uiService.navigateTo('/main/home');
        },
        (error) => {
          this.uiService.presentAlert(error.error.message, 'danger');
        }
      );
  }

  async uploadImage(image: string) {
    const token = await this.userService.getToken();
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    return fileTransfer
      .upload(image, `${API_URL}/posts/upload`, options)
      .then((data) => {
        // TODO
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
