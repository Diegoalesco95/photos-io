import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/posts.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts: IPost[] = [];

  constructor() {}

  ngOnInit() {}
}
