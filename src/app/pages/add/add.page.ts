import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

declare let window: any;
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
    private geolocation: Geolocation,
    private camera: Camera
  ) {}

  ngOnInit() {}

  async createPost() {
    await this.postsService.createPost({
      message: this.post.message,
      coords: this.post.coords,
      imgs: this.tempImages,
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
        console.log(newCoords);
        this.post.coords = newCoords;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      })
      .finally(() => {
        this.loadingGeo = false;
      });
  }

  onTakePhoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.processImage(options);
  }

  onSelectPhoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        this.postsService.uploadImage(imageData);
        this.tempImages.push(img);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
