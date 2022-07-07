import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, userId: string): string {
    return `${API_URL}/posts/image/${userId}/${img}`;
  }
}
