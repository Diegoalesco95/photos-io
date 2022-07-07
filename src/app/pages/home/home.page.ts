import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/posts.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts: IPost[] = [];
  disableInfiniteScroll = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.doRefresh(null);
    this.postsService.newPost.subscribe((post) => {
      this.posts.unshift(post);
    });
  }

  doRefresh(event) {
    this.posts = [];
    this.disableInfiniteScroll = false;
    this.loadMore(event, true);
  }

  loadMore(event?, reset: boolean = false) {
    console.log('loadMore');

    this.postsService.getPosts(reset).subscribe((response) => {
      this.posts = [...this.posts, ...response.posts];

      if (event) {
        event.target.complete();

        if (response.posts.length === 0) {
          this.disableInfiniteScroll = true;
        }
      }
    });
  }
}
