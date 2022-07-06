import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  tempImages: string[] = [];
  loadingGeo = false;
  post = {
    message: '',
    coords: null,
    position: false,
  };

  constructor(
    private postsService: PostsService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {}

  async createPost() {
    await this.postsService.createPost({
      message: this.post.message,
      coords: this.post.coords,
    });

    this.post = {
      message: '',
      coords: null,
      position: false,
    };
  }

  getGeo() {
    if (!this.post.position) {
      this.post.coords = null;
      this.loadingGeo = false;
      return;
    }

    this.loadingGeo = true;

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const newCoords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = newCoords;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      })
      .finally(() => {
        this.loadingGeo = false;
      });
  }
}
