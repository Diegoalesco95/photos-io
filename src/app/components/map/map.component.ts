import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

declare let mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map: any;
  @Input() coords = '';
  lat: number;
  lng: number;

  constructor() {}

  ngOnInit() {
    const coordinates = this.coords.split(',');
    this.lat = Number(coordinates[0]);
    this.lng = Number(coordinates[1]);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGllZ29hbGVzY285NSIsImEiOiJjbDVhNXVndHIyam9rM2NtcnJncnljNDQ1In0.C0FMAl7WsZcVjDTH1dVC8g';
    const map = new mapboxgl.Map({
      center: [this.lng, this.lat],
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 15,
    });

    map.on('load', () => {
      map.resize();

      new mapboxgl.Marker({
        draggable: false,
      })
        .setLngLat([this.lng, this.lat])
        .addTo(map);
    });
  }
}
