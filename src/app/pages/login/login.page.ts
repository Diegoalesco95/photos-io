import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { IAvatar } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('mainSlide') slides: IonSlides;

  loginUser = {
    email: 'testing4@mail.com',
    password: 'test123',
  };

  signUpUser = {
    avatar: 'av-1.png',
    name: 'Test User',
    email: 'testing5@mail.com',
    password: 'test123',
  };

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  onLogin(fLogin: NgForm) {
    if (fLogin.valid) {
      this.userService.login(this.loginUser.email, this.loginUser.password);
    }
  }

  onSingUp(fSignUp: NgForm) {
    if (fSignUp.valid) {
      this.userService.signUp(this.signUpUser);
    }
  }

  onSelectAvatar(avatar: string) {
    this.signUpUser.avatar = avatar;
  }

  onShowLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  onShowSignUp() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
