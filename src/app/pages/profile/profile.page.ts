import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: IUser = null;
  selectedAvatar = 'av-1.png';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.onSelectAvatar(this.user.avatar);
  }

  logout() {}

  onSelectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onUpdateProfile(updateForm: NgForm) {
    if (updateForm.valid) {
      this.userService.updateUser({
        ...this.user,
        avatar: this.selectedAvatar,
      });
    }
  }
}
