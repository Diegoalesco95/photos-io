import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from 'src/app/pipes/pipes.module';

import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AvatarSelectorComponent,
    MapComponent,
    PostComponent,
    PostsComponent,
  ],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [AvatarSelectorComponent, PostsComponent],
})
export class ComponentsModule {}
