import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { IUser, IUserResponse } from 'src/app/interfaces/user.interface';
import { UiService } from './ui.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = null;
  private user: IUser = null;
  private uris = Object.freeze({
    login: '/user/login',
    signup: '/user/new',
    verify: '/user/',
    update: '/user/update',
  });

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private uiService: UiService
  ) {
    storageService.init();
  }

  getUser() {
    return { ...this.user };
  }

  async getToken() {
    await this.loadToken();
    return this.token;
  }

  login(email: string, password: string) {
    return this.http
      .post<IUserResponse>(`${API_URL}${this.uris.login}`, { email, password })
      .subscribe(
        async (response) => {
          await this.saveToken(response.token);
          await this.uiService.presentAlert('Login successful', 'success');
          this.uiService.navigateTo('/main/home');
        },
        async (error: HttpErrorResponse) => {
          await this.resetToken();
          await this.uiService.presentAlert(error.error.message, 'danger');
        }
      );
  }

  signUp(user: IUser) {
    return this.http
      .post<IUserResponse>(`${API_URL}${this.uris.signup}`, user)
      .subscribe(
        async (response) => {
          await this.saveToken(response.token);
          await this.uiService.presentAlert('Signup successful', 'success');
          this.uiService.navigateTo('/main/home');
        },
        async (error: HttpErrorResponse) => {
          await this.resetToken();
          await this.uiService.presentAlert(error.error.message, 'danger');
        }
      );
  }

  async loadToken() {
    this.token = await this.storageService.load('token');
  }

  async veryifyToken(): Promise<boolean> {
    await this.loadToken();

    if (!this.token) {
      this.uiService.navigateTo('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        authorization: `Bearer ${this.token}`,
      });

      this.http
        .get<IUserResponse>(`${API_URL}${this.uris.verify}`, {
          headers,
        })
        .subscribe(
          (response) => {
            this.user = response.user;
            resolve(true);
          },
          (error: HttpErrorResponse) => {
            this.resetToken();
            this.uiService.presentAlert(error.error.message, 'danger');
            this.uiService.navigateTo('/login');
            resolve(false);
          }
        );
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storageService.save('token', token);
    this.veryifyToken();
  }

  async resetToken() {
    this.token = null;
    await this.storageService.remove('token');
  }

  updateUser(user: IUser) {
    return this.http
      .put<IUserResponse>(`${API_URL}${this.uris.update}`, user, {
        headers: new HttpHeaders({
          authorization: `Bearer ${this.token}`,
        }),
      })
      .subscribe(
        (response) => {
          this.token = response.token;
          this.saveToken(response.token);
          this.uiService.presentAlert('Profile updated', 'success');
        },
        (error: HttpErrorResponse) => {
          this.uiService.presentAlert(error.error.message, 'danger');
        }
      );
  }

  async logout() {
    await this.resetToken();
    this.uiService.navigateTo('/login');
  }
}
