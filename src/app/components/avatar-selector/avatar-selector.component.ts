import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAvatar } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Input() defaultAvatar = 'av-1.png';
  @Output() avatarSelected = new EventEmitter<string>();
  avatarSlides = Object.freeze({
    slidesPerView: 3.5,
  });
  avatars: IAvatar[] = [
    {
      img: 'av-1.png',
      selected: true,
    },
    {
      img: 'av-2.png',
      selected: false,
    },
    {
      img: 'av-3.png',
      selected: false,
    },
    {
      img: 'av-4.png',
      selected: false,
    },
    {
      img: 'av-5.png',
      selected: false,
    },
    {
      img: 'av-6.png',
      selected: false,
    },
    {
      img: 'av-7.png',
      selected: false,
    },
    {
      img: 'av-8.png',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.avatars.forEach((av) => {
      if (av.img === this.defaultAvatar) {
        av.selected = true;
      } else {
        av.selected = false;
      }
    });
  }

  onSelectedAvatar(avatar: IAvatar) {
    this.avatars.forEach((av) => (av.selected = false));
    avatar.selected = true;
    this.avatarSelected.emit(avatar.img);
  }
}
