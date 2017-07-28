import { Component } from '@angular/core';

@Component({
  selector: 'app-map-view',
  template: `
    <div id='background'>
      <app-map></app-map>
      <app-switch-view selectedView="map"></app-switch-view>
      <app-about-button></app-about-button>
      <share-button></share-button>
    </div>
  `,
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {
}
